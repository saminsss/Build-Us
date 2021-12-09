import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Employee/getTableInfo';
import EmployeeListResults from '../components/Shared/ListResults';
import EmployeeListToolbar from '../components/Shared/ListToolbar';
import Cookies from 'js-cookie';
import Authentication from '../components/Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const EmployeeList = () => {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		fetchEmployees();
	}, []);


	const fetchEmployees = async () => {
		const res = await Axios.get('/api/employees/' + Cookies.get('id')); //ID is required for auth
		setEmployees(res.data);
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
						<EmployeeListResults
							tableinfo={getTableInfo()}
							data={employees} />
					</Box>
				</Container>
			</Box>
		</Box>
	)
};

export default EmployeeList;