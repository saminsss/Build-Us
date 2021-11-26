require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//for deployment to heroku
app.get('/', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			name: 'BuildUs',
			version: '0.1.0'
		}
	});
});

//routes and controllers
require('./routes/customers')(app);
require('./routes/users')(app);
require('./routes/transactions')(app);
require('./components/auth').authenticate(app);

const port = process.env.PORT;
app.listen(port, () => {
	console.log("server has started on port", port);
});