import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
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
	Tab,
	Tabs,
	Tooltip,
	makeStyles,
} from '@material-ui/core';

import {
	Sort,
} from '@material-ui/icons';

import { useHistory } from 'react-router';

import ListToolbar from '../Shared/ListToolbar';

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
		actionCell: {
			display: 'flex',
			flexWrap: 'nowrap'
		},
		actionButton: {
			maxWidth: theme.spacing(1),
			minWidth: theme.spacing(1),
			marginRight: theme.spacing(0.25)
		}
	}
});

const ListResults = ({ routename = 'route', tabinfo, actions, data, ...rest }) => {
	const styles = useStyles();
	const [rowData, setRowData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [sortKey, setSortKey] = useState({});
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);
	const [tabNo, setTabNo] = useState(0);

	const history = useHistory();

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

	const handleTabChange = (event, value) => {
		setTabNo(value);
	}

	/**
	 * Build a string for the table cell based on the data passed in along with how each data field is to be seperated
	 * @param {*} rowData the data set object
	 * @param {*} datakeys the keys which are to be searched for in the object
	 * @param {*} rowdataseparator the seperator used to seperated the data fields in cell
	 * @returns constructed string
	 */
	const buildTableRowCells = (rowdata, rowdatakeys, rowdataseparator) => {
		if (!rowdataseparator) rowdataseparator = '';

		let completecell = '';
		for (let key of rowdatakeys) {
			if (!rowdata[key]) continue;
			if (key.includes('date'))
				completecell += moment(rowdata[key]).format('MMMM Do, YYYY') + rowdataseparator
			else
				completecell += rowdata[key] + rowdataseparator
		}
		if (completecell.length === 0) return completecell;
		else return completecell.substring(0, completecell.length - rowdataseparator.length)
	};

	/**Sorts the row data according to the sort order
	 * @param columntitle the column to sort by
	 * @param rowdatakeys the keys that make up each table cell for each row
	 * @param sortorder the order in which the rows are sorted, true - descending, false - ascending
	 */
	const sort = (columntitle, rowdatakeys, sortorder = false) => {
		setSortKey({ [columntitle]: !sortKey[columntitle] })
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
			if (sortorder === false)
				return sortByValueA.localeCompare(sortByValueB);
			else
				return sortByValueB.localeCompare(sortByValueA);
		});

		setRowData([...sortedList]);
	};

	let searchFilters = [];
	for (let tab of tabinfo) {
		searchFilters.push(...(tab.tabtableinfo))
	};

	return (
		<Box {...rest}>
			<ListToolbar
				searchdata={data}
				searchfilters={searchFilters}
				setfiltereddata={setRowData}
				setpage={setPage}
				routename={routename}
			/>

			<Card>
				<Tabs value={tabNo} onChange={handleTabChange}>
					{tabinfo.map((tab, tabindex) => (
						<Tab key={tabindex} label={tab.tabtitle} />
					))}
				</Tabs>
				{tabinfo.map((tab, tabindex) => (
					<TabPanel key={tabindex} value={tabNo} index={tabindex}>
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
										{tab.tabtableinfo?.map((table, tabtableindex) => (
											<TableCell key={tabtableindex}>
												<Box className={styles.tableHeader}>
													{table.columntitle}
													<Button
														className={styles.sortButton}
														variant='outlined'
														onClick={() => sort(table.columntitle, table.rowdatakeys, sortKey[table.columntitle])}
													>
														<Sort />
													</Button>
												</Box>
											</TableCell>
										))}
										<TableCell>
											<Box>
												Actions
											</Box>
										</TableCell>
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
											{tab.tabtableinfo?.map((table, index) => (
												<TableCell key={index}>
													{buildTableRowCells(rowitem, table.rowdatakeys, table.rowdataseparator)}
												</TableCell>
											))}
											<TableCell className={styles.actionCell}>
												{actions.map((action, index) => (
													<Tooltip key={index} title={action.title}>
														<Button
															className={styles.actionButton}
															variant='outlined'
															onClick={() => history.push(`/${routename}/${action.path}`)}
														>
															{action.icon}
														</Button>
													</Tooltip>
												))}
											</TableCell>

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
					</TabPanel>
				))}
			</Card>
		</Box >
	);
};

ListResults.propTypes = {
	data: PropTypes.array.isRequired
};

const TabPanel = ({ children, value, index }) => (
	value === index && <Box>{children}</Box>
);

export default ListResults;