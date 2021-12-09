import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Container
} from '@material-ui/core';
import getTableInfo from '../components/Invoice/getTableInfo';
import InvoiceListResults from '../components/Shared/ListResults';
import InvoiceListToolbar from '../components/Shared/ListToolbar';
import Cookies from 'js-cookie';
import Authentication from '../components/Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const InvoiceList = () => {
	const [invoices, setInvoices] = useState([]);

	useEffect(() => {
		fetchInvoices();
	}, []);


	const fetchInvoices = async () => {
		const res = await Axios.get('/api/invoices/' + Cookies.get('id')); //ID is required for auth
		setInvoices(res.data);
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
						<InvoiceListResults
							tableinfo={getTableInfo()}
							data={invoices} />
					</Box>
				</Container>
			</Box>
		</Box>
	)
};

export default InvoiceList;