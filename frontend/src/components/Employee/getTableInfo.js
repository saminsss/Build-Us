import {
	Book,
	Edit
} from '@material-ui/icons';

const getTableInfo = () => {
	const tabList = [
		{
			tabtitle: 'General Info',
			tabtableinfo: [
				{
					columntitle: 'Name',
					rowdatakeys: ['firstname', 'lastname'],
					rowdataseparator: ' '
				},
				{
					columntitle: 'Email',
					rowdatakeys: ['email'],
				},
				{
					columntitle: 'Address',
					rowdatakeys: ['city', 'province', 'country'],
					rowdataseparator: ', '
				},
				{
					columntitle: 'Title',
					rowdatakeys: ['title'],
				},
				{
					columntitle: 'Join Date',
					rowdatakeys: ['joindate'],
				}
			]
		},
		{
			tabtitle: 'Contact Info',
			tabtableinfo: [
				{
					columntitle: 'Name',
					rowdatakeys: ['firstname', 'lastname'],
					rowdataseparator: ' '
				},
				{
					columntitle: 'Phone',
					rowdatakeys: ['phone'],
				},
			]
		},
	];

	const actionList = [
		{
			title: 'Edit',
			icon: <Edit />,
			path: 'edit'
		},
		{
			title: 'Hours',
			icon: <Book />,
			path: 'hours'
		},
	]

	return { tabList, actionList };
}

export default getTableInfo;