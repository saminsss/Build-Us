import { useState, useEffect } from 'react';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Invoice/getTableInfo';
import InvoiceListResults from '../components/Shared/ListResults';

const InvoiceList = ({ id, axios, ...rest }) => {
	const [invoices, setInvoices] = useState([]);
	const [tabInfo, setTabInfo] = useState([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const res = await axios.get('/api/invoices/' + id); //ID is required for auth
			setInvoices(res.data);
		};

		fetchInvoices();
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
				{invoices && tabList && actionList &&
					<Container maxWidth={false}>
						<Box sx={{ pt: 3 }}>
							<InvoiceListResults
								tabinfo={tabList}
								actions={actionList}
								data={invoices}
								{...rest} //contains routename
							/>
						</Box>
					</Container>
				}
			</Box>
		</Box>
	)
};

export default InvoiceList;