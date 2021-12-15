import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';

const Dashboard = (props) => {
	const { role } = props;
	let dashboard = 'Loading';
	if (role === 'A')
		dashboard = <AdminDashboard />
	else if (role === 'E')
		dashboard = <EmployeeDashboard />
	else if (role === 'C')
		dashboard = <CustomerDashboard />
	else
		dashboard = 'Something went wrong'

	return (
		dashboard
	)
};

export default Dashboard;