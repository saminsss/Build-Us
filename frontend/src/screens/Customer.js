import { useState, useEffect } from 'react';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Customer/getTableInfo';
import CustomerListResults from '../components/Shared/ListResults';

const CustomerList = ({ id, axios }) => {
	const [customers, setCustomers] = useState([]);
	const [tabInfo, setTabInfo] = useState([]);

	useEffect(() => {
		const fetchCustomers = async () => {
			const res = await axios.get('/api/customers/' + id); //ID is required for auth
			setCustomers(res.data);
		};
		fetchCustomers();
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
				{customers && tabList && actionList &&
					<Container maxWidth={false}>
						<Box sx={{ pt: 3 }}>
							<CustomerListResults
								routename={'customers'}
								tabinfo={tabList}
								actions={actionList}
								data={customers} />
						</Box>
					</Container>
				}
			</Box>
		</Box>
	)
};

export default CustomerList;