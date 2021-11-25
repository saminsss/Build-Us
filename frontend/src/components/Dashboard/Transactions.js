import { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import Cookies from 'js-cookie';
import Authentication from '../Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [limit, setLimit] = useState(5);

	useEffect(() => {
		fetchTransactions();
	}, []);


	const fetchTransactions = async () => {
		const res = await Axios.get('/transactions/' + Cookies.get('id'));
		setTransactions(res.data);
	};

	return (
		<Card>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							Transaction
						</TableCell>
						<TableCell>

						</TableCell>
						<TableCell>

						</TableCell>
						<TableCell>
							Amount
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{transactions.slice(0, limit).map((transaction) => (
						<TableRow
							hover
							key={transaction.id}
						>
							<TableCell>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex'
									}}
								>
									<Typography
										color="textPrimary"
										variant="body2"
										sx={{ pl: 3 }}
									>
										Transaction info 0
									</Typography>
								</Box>
							</TableCell>
							<TableCell>
								Transaction Info 1
							</TableCell>
							<TableCell>
								Transaction info 2
							</TableCell>
							<TableCell>
								Transaction info 3
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default Transactions;