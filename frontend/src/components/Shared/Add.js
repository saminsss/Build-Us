import React, { useState, useEffect } from 'react';

import {
	Box,
	Container,
	Grid
} from "@material-ui/core";


import getAddContentLayout from '../Add/getAddContentLayout';

import { useHistory } from 'react-router';

import {
	makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => {
	return {
		root: {
			backgroundColor: 'white',
			marginTop: theme.spacing(-3),
			paddingTop: theme.spacing(3)
		},
	}
});

const Add = ({ role }) => {
	const styles = useStyles();

	const [listData, setListData] = useState([]);

	const history = useHistory();

	useEffect(() => {
		setListData(getAddContentLayout(role, history.location.state.routename));
	}, [role]);



	const handleSubmit = (event) => {
		event.preventDefault();

		console.log("event");
	}

	return (
		<Box className={styles.root}>
			<Container component="main" maxWidth="md">
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						{listData.map((data) => (
							data.fields.map((field) => {
								return field;
							})
						))}
					</Grid>
				</Box>
			</Container>
		</Box>

	)
};

export default Add;