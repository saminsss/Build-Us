require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

require('./routes/customers')(app);
require('./routes/users')(app);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server has started on port", port);
});