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


import ProtectedRoute from "./components/Routes/ProtectedRoute";
import DrawerLayout from "./components/App/DrawerLayout";
import SimpleLayout from "./components/App/SimpleLayout";


import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
	typography: {
		fontFamily: [
			'Roboto', 'Quicksand'
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

const customerRouteName = 'customers';
const employeeRouteName = 'employees';
const invoiceRouteName = 'invoices';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Switch>

					<Route exact path={
						[
							`/dashboard`,
							`/${customerRouteName}`, `/${customerRouteName}/add`,
							`/${employeeRouteName}`, `/${employeeRouteName}/add`,
							`/${invoiceRouteName}`
						]}>
						<DrawerLayout>
							{/* Dashboard */}
							<ProtectedRoute
								exact path="/dashboard"
								component={Dashboard}
								allowedroles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />

							{/* Employees */}
							<ProtectedRoute
								exact path={`/${employeeRouteName}`}
								routename={employeeRouteName}
								component={EmployeeList}
								allowedroles={['ADMIN']} />
							<ProtectedRoute
								exact path={`/${employeeRouteName}/add`}
								routename={employeeRouteName}
								component={Add}
								allowedroles={['ADMIN']} />

							{/* Customers */}
							<ProtectedRoute
								exact path={`/${customerRouteName}`}
								routename={customerRouteName}
								component={CustomerList}
								allowedroles={['ADMIN', 'EMPLOYEE']} />
							<ProtectedRoute
								exact path={`/${customerRouteName}/add`}
								routename={customerRouteName}
								component={Add}
								allowedroles={['ADMIN', 'EMPLOYEE']} />

							{/* Invoices */}
							<ProtectedRoute
								exact path={`/${invoiceRouteName}`}
								routename={invoiceRouteName}
								component={InvoiceList}
								allowedroles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />
						</DrawerLayout>
					</Route>

					<Route exact path={
						[
							"/",
							"/signin",
							"/signup",
							"/unauthorized"
						]}>
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
