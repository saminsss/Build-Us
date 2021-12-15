import { useState, useEffect } from 'react';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Invoice/getTableInfo';
import InvoiceListResults from '../components/Shared/ListResults';

const InvoiceList = ({ id, axios }) => {
	const [invoices, setInvoices] = useState([]);
	const [tableInfo, setTableInfo] = useState([]);

	useEffect(() => {
		const fetchInvoices = async () => {
			const res = await axios.get('/api/invoices/' + id); //ID is required for auth
			setInvoices(res.data);
		};

		fetchInvoices();
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
				{invoices &&
					<Container maxWidth={false}>
						<Box sx={{ pt: 3 }}>
							<InvoiceListResults
								componentname={'invoices'}
								tableinfo={tableInfo}
								data={invoices} />
						</Box>
					</Container>
				}
			</Box>
		</Box>
	)
};

export default InvoiceList;