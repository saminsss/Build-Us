const pool = require("../components/db");
const { authenticate, authenticateToken } = require("../components/auth");

const tableName = "CUSTOMERS";

//routes
const insertRoutes = ["/customers/:userId"];
const selectRoutes = ["/customers/:userid"];
const updateRoutes = ["/customers/:userId"];
const deleteRoutes = ["/customers/:userId"];

const customers = (app) => {
	//authentications routes acting as middleware
	authenticate(app);

	//insert a customer
	app.post(insertRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.userid) return res.status(403).json({ msg: "error" });
		try {
			var sql = "INSERT INTO " + tableName + " ("
			var sqlValues = "VALUES ("
			var param = 1;
			var sqlData = [];

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
			const newStudent = await pool.query(sql, sqlData);
			res.json(newStudent.rows);
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.json(error.message);
		}
	});

	//get customers
	app.get(selectRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.userid) return res.status(403).json({ msg: "error" });
		try {
			var sql = "SELECT * FROM " + tableName + " ";
			var sqlData = [];
			var param = 1;

			var json = req.query;
			if (Object.keys(json) != 0) {
				var whereClause = "WHERE ";
				for (key in json) {
					if (json[key] == null) continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const students = await pool.query(sql, sqlData);
			res.json(students.rows);
		} catch (error) {
			console.log("Route not correctly formatted");
			res.json(error.message);
		}
	});

	//update a customer
	app.put(updateRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.userid) return res.status(403).json({ msg: "error" });
		try {
			var sql = "UPDATE " + tableName + " SET ";
			var sqlData = [];
			var param = 1;

			var json = req.query;
			for (key in json) {
				sql += key.toUpperCase() + " = $" + param++ + ", ";
				sqlData.push(json[key])
			}
			sql = sql.substring(0, sql.length - 2) + " ";

			json = req.query;
			if (Object.keys(json) != 0) {
				var whereClause = "WHERE ";
				for (key in json) {
					if (json[key] == null) continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const update = await pool.query(sql, sqlData);
			res.json(update);
		} catch (error) {
			console.log("Route/JSON Data not correctly formatted");
			res.json(error.message);
		}
	});

	//delete a customer
	app.delete(deleteRoutes, authenticateToken, async (req, res) => {
		if (req.id != req.params.userid) return res.status(403).json({ msg: "error" });
		try {
			var sql = "DELETE FROM " + tableName + " ";
			var sqlData = [];
			var param = 1;

			var json = req.query;
			var whereClause = "WHERE ";
			if (Object.keys(json) != 0) {
				for (key in json) {
					if (json[key] == null) continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const deleteStudent = await pool.query(sql, sqlData);
			res.json(deleteStudent);
		} catch (error) {
			console.log("Route not correctly formatted");
			res.json(error.message);
		}
	});
}

module.exports = customers;