const pool = require("../components/db");

const authTableName = "AUTHENTICATION"
const usersTable = "USERS"

const authController = () => {
	const insertToken = async (token) => {
		let res = {};
		try {
			let sql = "INSERT INTO " + authTableName + " (TOKEN) VALUES ($1) RETURNING *";
			let sqlData = [token];
			const newtoken = await pool.query(sql, sqlData);
			res.token = newtoken.rows;
			res.msg = "success";
			return res;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
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

	const updateToken = async (token) => {
		let res = {};
		try {
			let sql = "UPDATE " + authTableName + " SET TOKEN = $1 WHERE TOKEN = $2";
			let sqlData = [token];
			const returntoken = await pool.query(sql, sqlData);
			res.msg = "success";
			return res;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}
	}

	const deleteToken = async (token) => {
		let res = {};
		try {
			let sql = "DELETE FROM " + authTableName + " WHERE TOKEN = $1";
			let sqlData = [token];
			const returntoken = await pool.query(sql, sqlData);
			res.msg = "success";
			return res;
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.msg = "error";
		}
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

	return { insertToken, getToken, updateToken, deleteToken, getRole };
}

module.exports = authController();