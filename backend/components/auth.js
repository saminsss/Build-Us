require("dotenv").config();

const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authentications');

const userTableName = "USERS";

const signInRoutes = ["/auth/signin"];
const signOutRoutes = ["/auth/signout"];
const signUpRoutes = ["/auth/signup"];
const refreshRoutes = ["/auth/refresh"];

function generateAccessToken(id) {
	return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

function generateRefreshToken(id) {
	return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).json({ msg: "error" });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ msg: "error" });
		req.id = user.id;
		next();
	});
}

const authenticate = (app) => {
	//signin
	app.post(signInRoutes, async (req, res) => {
		try {
			const { email, password } = req.body;
			let sql = "SELECT * FROM " + userTableName + " WHERE EMAIL = $1";
			let sqlData = [email];

			console.log(sql, sqlData);
			const users = await pool.query(sql, sqlData);
			const user = users.rows[0];

			let info = {};

			if (!user) {
				info.msg = "invalidemail";
				return res.json(info);
			}

			info.id = user.id;
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				info.msg = "invalidpassword";
				return res.json(info);
			}

			const id = { id: user.id };
			const accessToken = generateAccessToken(id);
			const refreshToken = generateRefreshToken(id);
			//TODO add user id to auth table so token can be updated
			const refreshRes = await authController.insertToken(refreshToken);

			if (refreshRes.msg == "success") {
				info.route = '/customers';
				info.msg = "success";
				info.accessToken = accessToken;
				info.refreshToken = refreshToken;
				return res.json(info);
			}

			res.status(404).json(info);
		} catch (error) {
			console.log(error);
			res.status(401).json({ msg: "error" });
		}
	});

	//signup
	app.post(signUpRoutes, async (req, res) => {
		try {
			let sql = "INSERT INTO " + userTableName + " ("
			let sqlValues = "VALUES ("
			let param = 1;
			let sqlData = [];

			if (req.body.password != null) {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				req.body.password = hashedPassword;
			}
			let json = req.body;
			for (key in json) {
				sql += key.toUpperCase() + ", ";
				sqlValues += '$' + param++ + ", ";
				sqlData.push(json[key])
			}
			sql = sql.substring(0, sql.length - 2) + ") ";
			sqlValues = sqlValues.substring(0, sqlValues.length - 2) + ") ";
			sql += sqlValues;
			sql += "RETURNING *"

			console.log(sql, sqlData);
			const newuser = await pool.query(sql, sqlData);
			res.status(200).json(newuser.rows[0]);
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ msg: "error" });
		}
	});

	//signout
	app.post(signOutRoutes, authenticateToken, async (req, res) => {
		try {
			const refreshToken = req.body.token;
			const deleted = await authController.deleteToken(refreshToken);
			if (deleted.msg != "success") return res.status(401).json({ msg: "error" });

			res.status(200).json({
				msg: "success"
			});
		} catch (err) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	//refresh tokens
	app.post(refreshRoutes, async (req, res) => {
		try {
			const refreshToken = req.body.token;
			if (!refreshToken) return res.status(401).json({ msg: "error" });

			const token = await authController.getToken(refreshToken);
			console.log(token)
			if (token.msg != 'success') return res.status(200).json({ msg: "error" });

			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
				if (err) return res.status(403).json({ msg: "error" });
				const deleted = await authController.deleteToken(refreshToken);

				if (deleted.msg != "success") return res.status(401).json({ msg: "error" });

				const id = { id: user.id };
				const newAccessToken = generateAccessToken(id);
				const newRefreshToken = generateRefreshToken(id);
				const refreshRes = await authController.insertToken(newRefreshToken);

				res.status(200).json({
					accessToken: newAccessToken,
					refreshToken: newRefreshToken
				});
			});
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});
}

module.exports = { authenticate, authenticateToken };