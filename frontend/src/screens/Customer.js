import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/CustomerListResults';
import CustomerListToolbar from '../components/CustomerListToolbar';
import Cookies from 'js-cookie';
import Decode from 'jwt-decode';
//import Cookie from '../components/Cookie';

const CustomerList = () => {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		fetchCustomers();
	}, []);

	Axios.interceptors.request.use(async (config) => {
		let currentDate = new Date();
		const decodedToken = Decode(Cookies.get('accessToken'));
		if (decodedToken.exp * 1000 < currentDate.getTime()) {
			const data = await refreshToken();
			config.headers.authorization = "Bearer " + data.accessToken;
		}
		return config;
	}, (error) => (Promise.reject(error)));

	const refreshToken = async () => {
		console.log('new token')
		try {
			const res = await Axios.create().post('http://localhost:5000/auth/refresh', {
				token: Cookies.get('refreshToken')
			});

			var cookie = Cookies.withAttributes({ sameSite: 'strict' });
			const remember = Cookies.get('remember');
			if (remember == 'true') cookie = Cookies.withAttributes({ expires: 15, sameSite: 'strict' });

			cookie.set('accessToken', res.data.accessToken);
			cookie.set('refreshToken', res.data.refreshToken);

			//Cookie.set('key', 'value');
			return res.data;
		} catch (error) {
			console.log(error);
		}
	}

	const fetchCustomers = async () => {
		const res = await Axios.get('http://localhost:5000/customers/' + Cookies.get('id'), {
			headers: { authorization: "Bearer " + Cookies.get('accessToken') }
		});
		setCustomers(res.data);
	};

	return (
		<Box>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3
				}}
			>
				<Container maxWidth={false}>
					<CustomerListToolbar />
					<Box sx={{ pt: 3 }}>
						<CustomerListResults customers={customers} />
					</Box>
				</Container>
			</Box>
		</Box>
	)
};

export default CustomerList;