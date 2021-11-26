require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//middleware
app.use(cors());
app.use(express.json());

//routes and controllers
require('./routes/customers')(app);
require('./routes/users')(app);
require('./routes/transactions')(app);
require('./components/auth').authenticate(app);

//For production use
//if(process.env.NODE_ENV == 'production')
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server has started on port", port);
});