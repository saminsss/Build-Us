import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Container
} from '@material-ui/core';
import CustomerListResults from '../components/Customer/CustomerListResults';
import CustomerListToolbar from '../components/Customer/CustomerListToolbar';
import Cookies from 'js-cookie';
import Authentication from '../components/Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const CustomerList = () => {
	const [customers, setCustomers] = useState([]);

	useEffect(() => {
		fetchCustomers();
	}, []);


	const fetchCustomers = async () => {
		const res = await Axios.get('http://localhost:5000/customers/' + Cookies.get('id')); //ID is required for auth
		setCustomers(res.data);
	};

	return (
		<Box sx={{
			height: '100vh'
		}}>
			<Box
				sx={{
					py: 3
				}}>
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