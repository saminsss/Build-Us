import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./Screens/Dashboard";
import Home from "./Screens/Home";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";

import CustomerList from "./Screens/Customer";
import EmployeeList from "./Screens/Employee";

import Add from "./components/Shared/Add";

import InvoiceList from "./Screens/Invoice";
import NotFound from "./Screens/NotFound";
import Unauthorized from "./Screens/Unauthorized";


import DrawerLayout from "./components/App/DrawerLayout";
import SimpleLayout from "./components/App/SimpleLayout";
import ProtectedRoute from "./components/Routes/ProtectedRoute";


import { createTheme, ThemeProvider } from "@material-ui/core";

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
