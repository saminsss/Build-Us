const pool = require("../components/db");

const authTableName = "AUTHENTICATION"
const usersTable = "USERS"

const authController = () => {
	const insertToken = async (email, token) => {
		let res = {};
		try {
			let sql = "INSERT INTO " + authTableName + " (EMAIL, TOKEN) VALUES ($1, $2) RETURNING *";
			let sqlData = [email, token];
			const newtoken = await pool.query(sql, sqlData);
			res.token = newtoken.rows;
			res.msg = "success";
			return res;
		} catch (error) {
			console.log(error);
			return res.msg = "error";
		}
	}

	const getToken = async (token) => {
		let res = {};
		try {
			let sql = "SELECT TOKEN FROM " + authTableName + " WHERE TOKEN = $1";
			let sqlData = [token];
			const returntoken = await pool.query(sql, sqlData);
			if (returntoken.rows.length == 0) {
				res.token = null;
				res.msg = 'not found';
				return res;
			}

			res.token = returntoken.rows[0].token;
			res.msg = 'success';
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}

		return res;
	}

	const updateToken = async (email, token) => {
		let res = {};
		try {
			let sql = "UPDATE " + authTableName + " SET TOKEN = $1 WHERE EMAIL = $2";
			let sqlData = [token, email];
			const returntoken = await pool.query(sql, sqlData);
			res.msg = "success";
			return res;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}

		return res;
	}

	const deleteToken = async (token) => {
		let res = {};
		try {
			let sql = "DELETE FROM " + authTableName + " WHERE TOKEN = $1 RETURNING *";
			let sqlData = [token];
			const returntoken = await pool.query(sql, sqlData);
			res.email = returntoken.rows[0].email;
			res.msg = "success";
			return res;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}

		return res;
	}

	const confirmTokenExists = async (email) => {
		try {
			let sql = "SELECT * FROM " + authTableName + " WHERE EMAIL = $1";
			let sqlData = [email];
			const data = await pool.query(sql, sqlData);
			console.log(data.rowCount)
			if (data.rowCount > 0) return true;
			else return false;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
		}

		return false;
	}

	const getRole = async (id) => {
		let res = {};
		try {
			let sql = "SELECT ROLE FROM " + usersTable + " WHERE ID = $1";
			let sqlData = [id];

			const data = await pool.query(sql, sqlData);
			if (data.rows.length == 0) {
				res.msg = 'not found';
				return res;
			}

			res.role = data.rows[0].role;
			res.msg = 'success';
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}

		return res;
	}

	return { insertToken, getToken, updateToken, deleteToken, getRole, confirmTokenExists };
}

module.exports = authController();