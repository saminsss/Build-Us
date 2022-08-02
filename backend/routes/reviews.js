const pool = require("../components/db");
const { authenticateToken, authorizeRole } = require("../components/auth");

const tableName = "REVIEWS";

//routes
const insertRoutes = ["/api/reviews/:id"];
const selectRoutes = ["/api/reviews/"];
const updateRoutes = ["/api/reviews/:id"];
const deleteRoutes = ["/api/reviews/:id"];

const reviews = (app) => {
	//insert a reviews
	app.post(insertRoutes, authenticateToken, authorizeRole(['ADMIN', 'EMPLOYEE', 'CUSTOMER']), async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "INSERT INTO " + tableName + " ("
			let sqlValues = "VALUES ("
			let param = 1;
			let sqlData = [];

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
			const newCustomer = await pool.query(sql, sqlData);
			res.json(newCustomer.rows);
		} catch (error) {
			console.log("JSON Data not correctly formatted");
			res.json(error.message);
		}
	});

	//get reviews
	app.get(selectRoutes, async (req, res) => {
		try {
			let sql = "SELECT * FROM " + tableName + " ";
			let sqlData = [];
			let param = 1;

			let json = req.query;
			if (Object.keys(json) != 0) {
				let whereClause = "WHERE ";
				for (key in json) {
					if (json[key] == null) continue;
					whereClause += key.toUpperCase() + " = $" + param++ + " AND ";
					sqlData.push(json[key]);
				}
				whereClause = whereClause.substring(0, whereClause.length - 5);
				sql += whereClause;
			}

			console.log(sql, sqlData);
			const reviews = await pool.query(sql, sqlData);
			res.json(reviews.rows);
		} catch (error) {
			console.log("Route not correctly formatted", error);
			res.json(error.message);
		}
	});

	//update a reviews
	app.put(updateRoutes, authenticateToken, authorizeRole(['ADMIN', 'EMPLOYEE', 'CUSTOMER']), async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "UPDATE " + tableName + " SET ";
			let sqlData = [];
			let param = 1;

			let json = req.query;
			for (key in json) {
				sql += key.toUpperCase() + " = $" + param++ + ", ";
				sqlData.push(json[key])
			}
			sql = sql.substring(0, sql.length - 2) + " ";

			json = req.query;
			if (Object.keys(json) != 0) {
				let whereClause = "WHERE ";
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

	//delete a reviews
	app.delete(deleteRoutes, authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
		if (req.id != req.params.id) return res.status(403).json({ msg: "error" });
		try {
			let sql = "DELETE FROM " + tableName + " ";
			let sqlData = [];
			let param = 1;

			let json = req.query;
			let whereClause = "WHERE ";
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

module.exports = reviews;