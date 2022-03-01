import React from 'react';

import {
	Box,
	makeStyles,
} from '@material-ui/core';

import Introduction from '../components/Home/Introduction';
import Featured from '../components/Home/Featured';
import Works from '../components/Home/Works';
import Reviews from '../components/Home/Reviews';
import Grow from '../components/Home/Grow';
import Footer from '../components/Home/Footer';

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

			<Grow />

			<Footer />

		</Box >
	);
};

export default Home;
