import AdminDashboard from '../components/Dashboard/AdminDashboard';
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import CustomerDashboard from '../components/Dashboard/CustomerDashboard';

const Dashboard = ({ role }) => {
	let dashboard = 'Loading';
	if (role === 'ADMIN')
		dashboard = <AdminDashboard />
	else if (role === 'EMPLOYEE')
		dashboard = <EmployeeDashboard />
	else if (role === 'CUSTOMER')
		dashboard = <CustomerDashboard />
	else
		dashboard = 'Something went wrong'

	return (
		dashboard
	)
};

export default Dashboard;