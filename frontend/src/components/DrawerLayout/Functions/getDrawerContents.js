import {
	Dashboard,
	Person,
	LocalMall
} from '@material-ui/icons';

const getDrawerContents = (user) => {
	let list;
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
	else {
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