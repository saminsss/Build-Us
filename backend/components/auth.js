require("dotenv").config();

const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const userTableName = "USERS";
const authTableName = "AUTHENTICATION"

const signInRoutes = ["/auth/signin"];
const signOutRoutes = ["/auth/signout"];
const signUpRoutes = ["/auth/signup"];
const tokenRoutes = ["/auth/token"];
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
			var sql = "SELECT * FROM " + userTableName + " WHERE EMAIL = $1";
			var sqlData = [email];

			console.log(sql, sqlData);
			const users = await pool.query(sql, sqlData);

			var info = {};
			info.id = users.rows[0].id;
			const isValidPassword = await bcrypt.compare(password, users.rows[0].password);
			if (!isValidPassword) {
				info.route = '/signin';
				info.msg = "error";
				res.status(403).json(info);
				return;
			}

			const id = { id: users.rows[0].id };
			const accessToken = generateAccessToken(id);
			const refreshToken = generateRefreshToken(id);
			const refreshRes = await axios.post('http://localhost:5000/auth/token', {
				token: refreshToken
			});

			if (refreshRes.data.msg == "success") {
				info.route = '/customers';
				info.msg = "success";
				info.accessToken = accessToken;
				info.refreshToken = refreshToken;
			}

			res.status(200).json(info);
		} catch (error) {
			console.log(error);
			res.status(401).json({ msg: "error" });
		}
	});

	//signup
	app.post(signUpRoutes, async (req, res) => {
		try {
			var sql = "INSERT INTO " + userTableName + " ("
			var sqlValues = "VALUES ("
			var param = 1;
			var sqlData = [];

			if (req.body.password != null) {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				req.body.password = hashedPassword;
			}
			var json = req.body;
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
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	//signout
	app.post(signOutRoutes, authenticateToken, async (req, res) => {
		try {
			const refreshToken = req.body.token;
			const deleted = await axios.delete('http://localhost:5000/auth/token', {
				data: {
					token: refreshToken
				}
			});
			if (deleted.msg != "success") return res.status(401).json({ msg: "error" });

			res.status(200).json({
				msg: "success"
			});
		} catch (err) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	app.post(tokenRoutes, async (req, res) => {
		try {
			//TODO insert user to authentication table
			var sql = "INSERT INTO " + authTableName + " (TOKEN) VALUES ($1) RETURNING *";
			var sqlData = [req.body.token];
			const newtoken = await pool.query(sql, sqlData);
			res.status(200).json({
				token: newtoken.rows,
				msg: 'success'
			});
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	app.get(tokenRoutes, async (req, res) => {
		try {
			var sql = "SELECT TOKEN FROM " + authTableName + " WHERE TOKEN = $1";
			var sqlData = [req.body.token];
			const token = await pool.query(sql, sqlData);
			if (token.rows.length == 0) return res.json({
				token: null,
				msg: 'error'
			});
			res.status(200).json({
				token: token.rows[0],
				msg: 'success'
			});
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	app.delete(tokenRoutes, async (req, res) => {
		try {
			var sql = "DELETE FROM " + authTableName + " WHERE TOKEN = $1";
			var sqlData = [req.body.token];
			const token = await pool.query(sql, sqlData);
			res.status(200).json({
				msg: "success"
			});
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.status(401).json({ error: error, msg: "error" });
		}
	});

	app.post(refreshRoutes, async (req, res) => {
		try {
			const refreshToken = req.body.token;
			if (!refreshToken) return res.status(401).json({ msg: "error" });

			const token = await axios.get('http://localhost:5000/auth/token', {
				data: {
					token: refreshToken
				}
			});

			if (!token.data.token) return res.status(403).json({ msg: "error" });

			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
				if (err) return res.status(403).json({ msg: "error" });
				const deleted = await axios.delete('http://localhost:5000/auth/token', {
					data: {
						token: refreshToken
					}
				});

				if (deleted.data.msg != "success") return res.status(401).json({ msg: "error" });

				const id = { id: user.id };
				const newAccessToken = generateAccessToken(id);
				const newRefreshToken = generateRefreshToken(id);
				const refreshRes = await axios.post('http://localhost:5000/auth/token', {
					token: newRefreshToken
				});
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