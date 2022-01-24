import { useState, useEffect } from 'react';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Employee/getTableInfo';
import EmployeeListResults from '../components/Shared/ListResults';

const EmployeeList = ({ id, axios, ...rest }) => {
	const [employees, setEmployees] = useState([]);
	const [tabInfo, setTabInfo] = useState([]);

	useEffect(() => {
		const fetchEmployees = async () => {
			const res = await axios.get('/api/employees/' + id); //ID is required for auth
			setEmployees(res.data);
		};
		fetchEmployees();
		setTabInfo(getTableInfo());
	}, [id, axios]);

	const { tabList, actionList } = tabInfo;

	return (
		<Box sx={{
			height: '100vh'
		}}>
			<Box
				sx={{
					py: 3
				}}>
				{employees && tabList && actionList &&
					<Container maxWidth={false}>
						<Box sx={{ pt: 3 }}>
							<EmployeeListResults
								tabinfo={tabList}
								actions={actionList}
								data={employees}
								{...rest} //contains routename
							/>
						</Box>
					</Container>
				}
			</Box>
		</Box>
	)
};

export default EmployeeList;