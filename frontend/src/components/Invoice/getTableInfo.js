const getTableInfo = () => {
	const list = [
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
		},
	];

	return list;
}

export default getTableInfo;