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
					headertitle: 'Name',
					rowdatakeys: ['firstname', 'lastname'],
					separator: ' '
				},
				{
					headertitle: 'Email',
					rowdatakeys: ['email'],
					separator: ''
				},
				{
					headertitle: 'Amount',
					rowdatakeys: ['amount'],
					separator: ''
				},
				{
					headertitle: 'Issue Date',
					rowdatakeys: ['issuedate'],
					separator: ''
				},
				{
					headertitle: 'Due Date',
					rowdatakeys: ['duedate'],
					separator: ''
				},
				{
					headertitle: 'Status',
					rowdatakeys: ['status'],
					separator: ''
				}
			]
		}
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