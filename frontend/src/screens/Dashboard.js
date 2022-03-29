import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';

const Dashboard = ({ role, ...rest }) => {
	let dashboard = 'Loading';
	if (role === 'ADMIN')
		dashboard = <AdminDashboard {...rest} />
	else if (role === 'EMPLOYEE')
		dashboard = <EmployeeDashboard {...rest} />
	else if (role === 'CUSTOMER')
		dashboard = <CustomerDashboard {...rest} />
	else
		dashboard = 'Something went wrong'

	return (
		dashboard
	)
};

export default Dashboard;