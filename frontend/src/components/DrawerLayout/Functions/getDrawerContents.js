import {
	Assessment,
	Dashboard,
	Person,
	LocalMall,
	Receipt
} from '@material-ui/icons';

const getDrawerContents = (user) => {
	let list = [];
	if (user?.role === 'A') {
		list = [
			{
				title: 'General',
				items: [
					{
						name: 'Dashboard',
						icon: <Dashboard color='primary' />,
						path: '/dashboard'
					}
				]
			},
			{
				title: 'Management',
				items: [
					{
						name: 'Users',
						icon: <Person color='primary' />,
						subitems: [
							{
								name: 'Customers',
								path: '/customers'
							},
							{
								name: 'Employees',
								path: '/employees'
							},
						]
					},
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								name: 'List',
								path: '/products'
							}
						]
					},
				]
			},
			{
				title: 'Billing',
				items: [
					{
						name: 'Invoices',
						icon: <Receipt color='primary' />,
						path: '/invoices'
					},
					{
						name: 'Reports',
						icon: <Assessment color='primary' />,
					},
				]
			}
		];
	}
	else if (user?.role === 'E') {
		list = [
			{
				title: 'Management',
				items: [
					{
						name: 'Customers',
						icon: <Person color='primary' />,
						path: '/customers'
					},
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								id: 1,
								name: 'List',
								path: '/products'
							}
						]
					}
				]
			}
		];
	}
	else if (user?.role === 'C') {
		list = [
			{
				title: 'General',
				items: [
					{
						id: 1,
						name: 'Dashboard',
						icon: <Dashboard color='primary' />,
						path: '/dashboard'
					}
				]
			},
			{
				title: 'Management',
				items: [
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								name: 'List',
								path: '/products'
							}
						]
					}
				]
			}
		];
	}

	return list;
}

export default getDrawerContents;