require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//routes and controllers
require('./routes/customers')(app);
require('./routes/users')(app);
require('./components/auth').authenticate(app);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server has started on port", port);
});