import { useState, useEffect } from 'react';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Employee/getTableInfo';
import EmployeeListResults from '../components/Shared/ListResults';

const EmployeeList = ({ id, axios }) => {
	const [employees, setEmployees] = useState([]);
	const [tableInfo, setTableInfo] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const res = await axios.get('/api/employees/' + id); //ID is required for auth
			setEmployees(res.data);
		};

		fetchEmployees();
		setTableInfo(getTableInfo());
	}, [id, axios]);




	return (
		<Box sx={{
			height: '100vh'
		}}>
			<Box
				sx={{
					py: 3
				}}>
				{employees &&
					<Container maxWidth={false}>
						<Box sx={{ pt: 3 }}>
							<EmployeeListResults
								componentname={'employees'}
								tableinfo={tableInfo}
								data={employees} />
						</Box>
					</Container>
				}
			</Box>
		</Box>
	)
};

export default EmployeeList;