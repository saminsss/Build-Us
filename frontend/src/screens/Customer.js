import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Customer/getTableInfo';
import CustomerListResults from '../components/Shared/ListResults';
import Cookies from 'js-cookie';
import Authentication from '../components/Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const CustomerList = () => {
	const [customers, setCustomers] = useState([]);
	const [tableInfo, setTableInfo] = useState([]);

	useEffect(() => {
		fetchCustomers();
		setTableInfo(getTableInfo())
	}, []);

	const fetchCustomers = async () => {
		const res = await Axios.get('/api/customers/' + Cookies.get('id')); //ID is required for auth
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
					<Box sx={{ pt: 3 }}>
						<CustomerListResults
							componentname={'customers'}
							tableinfo={tableInfo}
							data={customers} />
					</Box>
				</Container>
			</Box>
		</Box>
	)
};

export default CustomerList;