import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Customer from "./screens/Customer";
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

          <Route exact path={["/dashboard", "/customers"]}>
            <DrawerLayout>
              <AdminRoute exact path="/dashboard" component={Dashboard} />
              <EmployeeRoute exact path="/customers" component={Customer} />
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
