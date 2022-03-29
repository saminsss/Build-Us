import {
	CalendarToday,
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
					rowdataseparator: ' ',
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
					columntitle: 'Registration Date',
					rowdatakeys: ['registrationdate'],
				},
			]
		},
		{
			tabtitle: 'Contact Info',
			tabtableinfo: [
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
			title: 'Schedule',
			icon: <CalendarToday />,
			path: 'schedule'
		},
	];

	return { tabList, actionList };
}

export default getTableInfo;