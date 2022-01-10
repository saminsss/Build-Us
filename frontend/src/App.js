import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import EmployeeList from "./screens/Employee"

import CustomerList from "./screens/Customer";
import Add from "./components/Shared/Add";

import InvoiceList from "./screens/Invoice";
import Unauthorized from "./screens/Unauthorized";
import NotFound from "./screens/NotFound"


import AdminRoute from "./components/Routes/AdminRoute";
import EmployeeRoute from "./components/Routes/EmployeeRoute";
import DrawerLayout from "./components/App/DrawerLayout";
import SimpleLayout from "./components/App/SimpleLayout";


import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
	typography: {
		fontFamily: [
			'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'
		].join(','),
	},
	palette: {
		primary: {
			main: 'rgb(250, 250, 250)',
			contrastText: 'rgb(50, 125, 200)'
		},
		secondary: {
			main: 'rgb(10, 20, 35)',
			light: 'rgb(35, 45, 65)',
		},
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>

					<Route exact path={["/dashboard", "/customers", "/add", "/employees", "/invoices"]}>
						<DrawerLayout>
							{/* Dashboard */}
							<AdminRoute exact path="/dashboard" component={Dashboard} />

							{/* Employeed */}
							<AdminRoute exact path="/employees" component={EmployeeList} />

							{/* Customers */}
							<EmployeeRoute exact path="/customers" component={CustomerList} />

							{/* Invoices */}
							<AdminRoute exact path="/invoices" component={InvoiceList} />

							<AdminRoute exact path="/add" component={Add}></AdminRoute>
						</DrawerLayout>
					</Route>

					<Route exact path={["/", "/signin", "/signup", "/unauthorized"]}>
						<SimpleLayout>
							<Route exact path="/" component={Home} />
							<Route exact path="/signin" component={SignIn} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/unauthorized" component={Unauthorized} />
						</SimpleLayout>
					</Route>
					<Route exact path="/*" component={NotFound} />

				</Switch>
			</Router>
		</ThemeProvider >
	);
}

export default App;
