import React, { useState, useEffect } from 'react';

import {
	Box,
	Grid,
	Paper,
	makeStyles,
	Typography,
	Button,
} from '@material-ui/core';

import { Grow } from '@material-ui/core';

import { useHistory } from 'react-router';

import Introduction from '../components/Home/Introduction';
import Featured from '../components/Home/Featured';
import Works from '../components/Home/Works';
import Reviews from '../components/Home/Reviews'

const useStyles = makeStyles((theme) => {
	return {
		page: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			fontFamily: 'Quicksand',
			overflow: 'hidden',
		},
	}
});

const Home = () => {
	const styles = useStyles();

	return (
		<Box className={styles.page}>

			<Introduction />

			<Featured />

			<Works />

			<Reviews />

		</Box >
	);
};

export default Home;
