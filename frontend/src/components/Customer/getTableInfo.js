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
			headertitle: 'Phone',
			rowdatakeys: ['phone'],
		},
		{
			headertitle: 'Registration Date',
			rowdatakeys: ['registrationdate'],
		},
	];

	return list;
}

export default getTableInfo;