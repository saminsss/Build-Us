import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Card,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@material-ui/core';
import ListToolbar from '../Shared/ListToolbar';
import moment from 'moment';

const ListResults = ({ tableinfo, data, ...rest }) => {
	const [rowData, setRowData] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);

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

	const buildTableRowCells = (rowData, datakeys, seperator) => {
		if (!seperator) seperator = '';

		let completecell = '';
		for (let key of datakeys) {
			if (key.includes('date'))
				completecell += moment(rowData[key]).format('MMMM Do, YYYY') + seperator
			else
				completecell += rowData[key] + seperator
		}
		return completecell.substring(0, completecell.length - seperator?.length)
	}

	return (
		<Box>
			<ListToolbar
				searchIn={data}
				setList={setRowData}
				setPage={setPage}
				button='Add customers'
				placeholder='Search customer' />

			<Card {...rest}>
				<Box>
					<Table>
						<TableHead>
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
										{table.headertitle}
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
											{buildTableRowCells(rowitem, table.rowdatakeys, table.seperator)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
				<TablePagination
					component="div"
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