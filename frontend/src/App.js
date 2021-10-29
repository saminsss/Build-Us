import { BrowserRouter as Router, Switch, Route as CustomerRoute } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Customer from "./screens/Customer";
import Unauthorized from "./screens/Unauthorized";
import AdminRoute from "./components/Routes/AdminRoute";
import EmployeeRoute from "./components/Routes/EmployeeRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <CustomerRoute exact path="/" component={Home} />
        <AdminRoute exact path="/admin" component={Dashboard} />
        <EmployeeRoute exact path="/customers" component={Customer} />
        <CustomerRoute exact path="/signin" component={SignIn} />
        <CustomerRoute exact path="/signup" component={SignUp} />
        <CustomerRoute exact path="/unauthorized" component={Unauthorized} />
      </Switch>
    </Router>
  );
}

export default App;
