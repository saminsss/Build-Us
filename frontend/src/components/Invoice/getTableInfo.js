const getTableInfo = () => {
	const list = [
		{
			headertitle: 'Name',
			rowdatakeys: ['firstname', 'lastname'],
			seperator: ' '
		},
		{
			headertitle: 'Email',
			rowdatakeys: ['email'],
			seperator: ''
		},
		{
			headertitle: 'Amount',
			rowdatakeys: ['amount'],
			seperator: ''
		},
		{
			headertitle: 'Issue Date',
			rowdatakeys: ['issuedate'],
			seperator: ''
		},
		{
			headertitle: 'Due Date',
			rowdatakeys: ['duedate'],
			seperator: ''
		},
		{
			headertitle: 'Status',
			rowdatakeys: ['status'],
			seperator: ''
		},
	];

	return list;
}

export default getTableInfo;