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
		},
		{
			headertitle: 'Address',
			rowdatakeys: ['city', 'province', 'country'],
			separator: ', '
		},
		{
			headertitle: 'Title',
			rowdatakeys: ['title'],
		},
		{
			headertitle: 'Phone',
			rowdatakeys: ['phone'],
		},
		{
			headertitle: 'Join Date',
			rowdatakeys: ['joindate'],
		},
	];

	return list;
}

export default getTableInfo;