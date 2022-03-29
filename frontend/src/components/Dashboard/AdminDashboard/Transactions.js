import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	makeStyles,
	TableContainer
} from '@material-ui/core';

import moment from 'moment';

const useStyles = makeStyles((theme) => (
	{
		dateContainer: {
			width: 50,
			height: 50,
			borderRadius: 10,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.secondary.main
		}
	}
));

const Transactions = ({ id, axios }) => {
	const styles = useStyles();

	const [transactions, setTransactions] = useState([]);
	const [limit, setLimit] = useState(5);

	useEffect(() => {
		const fetchTransactions = async () => {
			const res = await axios.get('/api/transactions/' + id);
			setTransactions(res.data);
		};

		fetchTransactions();
	}, []);




	return (
		<Card>
			<TableContainer>
				<Table stickyHeader>
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
						{transactions && transactions.slice(0, limit).map((transaction) => (
							<TableRow
								hover
								key={transaction.id}
							>
								<TableCell>
									<Box className={styles.dateContainer} >
										<Typography style={{ fontWeight: 'bold' }}>
											{moment(transaction.date).format('D')}
										</Typography>
										<Typography>
											{moment(transaction.date).format('MMM')}
										</Typography>
									</Box>
								</TableCell>
								<TableCell>
									{transaction.firstname}
								</TableCell>
								<TableCell>
									{transaction.status}
								</TableCell>
								<TableCell>
									{transaction.amount}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</Card>
	);
};

export default Transactions;