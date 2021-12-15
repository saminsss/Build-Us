import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Button,
	Card,
	Checkbox,
	Table,
	TableContainer,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	makeStyles
} from '@material-ui/core';
import ListToolbar from '../Shared/ListToolbar';
import SortIcon from '@mui/icons-material/Sort';
import moment from 'moment';

const useStyles = makeStyles((theme) => {
	return {
		table: {
			backgroundColor: theme.palette.primary.light
		},
		tableHeader: {
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'center'
		},
		sortButton: {
			maxWidth: theme.spacing(1),
			minWidth: theme.spacing(1),
			marginLeft: theme.spacing(1.25)
		},
	}
});

const ListResults = ({ componentname = 'component', tableinfo, data, ...rest }) => {
	const styles = useStyles();
	const [rowData, setRowData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [sortOrder, setSortOrder] = useState({});

	useEffect(() => {
		setRowData(data);
	}, [data]);

	const handleSelectAll = (event) => {
		let newSelectedRows;

		if (event.target.checked) {
			newSelectedRows = rowData.map((rowitem) => rowitem.id);
		} else {
			newSelectedRows = [];
		}

		setSelectedRows(newSelectedRows);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedRows.indexOf(id);
		let newSelectedRows = [];

		if (selectedIndex === -1) {
			newSelectedRows = newSelectedRows.concat(selectedRows, id);
		} else if (selectedIndex === 0) {
			newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
		} else if (selectedIndex === selectedRows.length - 1) {
			newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedRows = newSelectedRows.concat(
				selectedRows.slice(0, selectedIndex),
				selectedRows.slice(selectedIndex + 1)
			);
		}

		setSelectedRows(newSelectedRows);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	const buildTableRowCells = (rowData, datakeys, separator) => {
		if (!separator) separator = '';

		let completecell = '';
		for (let key of datakeys) {
			if (!rowData[key]) continue;
			if (key.includes('date'))
				completecell += moment(rowData[key]).format('MMMM Do, YYYY') + separator
			else
				completecell += rowData[key] + separator
		}
		return completecell.substring(0, completecell.length - separator.length)
	};

	/**Sorts the rowData according to the sort order
	 * @param rowdatakeys the keys that make up each table cell for each row
	 * @param sortOrder the order in which the rows are sorted, true - descending, false - ascending
	**/
	const sort = (rowdatakeys, sortOrder = false) => {
		const sortedList = rowData.sort((a, b) => {
			let sortByValueA = '';
			let sortByValueB = '';
			for (let rowdatakey of rowdatakeys) {

				if (rowdatakey.includes('date')) {
					sortByValueA += moment(a[rowdatakey])?.format('YYYYMMDD');
					sortByValueB += moment(b[rowdatakey])?.format('YYYYMMDD');
				}
				else {
					sortByValueA += a[rowdatakey]
					sortByValueB += b[rowdatakey]
				}
			}
			if (sortOrder === false)
				return sortByValueA.localeCompare(sortByValueB);
			else
				return sortByValueB.localeCompare(sortByValueA);
		});

		setRowData([...sortedList]);
	};

	return (
		<Box {...rest}>
			<ListToolbar
				searchData={data}
				searchFilters={tableinfo}
				setList={setRowData}
				setPage={setPage}
				addButtonText={'Add ' + componentname}
				searchBarPlaceholder={'Search ' + componentname}
			/>

			<Card>
				<TableContainer>
					<Table>
						<TableHead className={styles.table} stickyHeader>
							<TableRow>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedRows.length === rowData.length}
										color="secondary"
										indeterminate={
											selectedRows.length > 0
											&& selectedRows.length < rowData.length
										}
										onChange={handleSelectAll}
									/>
								</TableCell>
								{tableinfo?.map((table, index) => (
									<TableCell key={index}>
										<Box className={styles.tableHeader}>
											{table.headertitle}
											<Button
												className={styles.sortButton}
												variant='outlined'
												onClick={() => {
													setSortOrder({ [table.headertitle]: !sortOrder[table.headertitle] })
													return sort(table.rowdatakeys, sortOrder[table.headertitle])
												}}
											>
												<SortIcon />
											</Button>
										</Box>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rowData?.slice((page * limit), (page + 1) * limit).map((rowitem, rowindex) => (
								<TableRow
									hover
									key={rowindex}
									selected={selectedRows.indexOf(rowitem.id) !== -1}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={selectedRows.indexOf(rowitem.id) !== -1}
											onChange={(event) => handleSelectOne(event, rowitem.id)}
											value="true"
										/>
									</TableCell>
									{tableinfo?.map((table, index) => (
										<TableCell key={index}>
											{buildTableRowCells(rowitem, table.rowdatakeys, table.separator)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component='div'
					count={rowData.length}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleLimitChange}
					page={page}
					rowsPerPage={limit}
					rowsPerPageOptions={[5, 10, 25]}
				/>
			</Card>
		</Box>
	);
};

ListResults.propTypes = {
	data: PropTypes.array.isRequired
};

export default ListResults;