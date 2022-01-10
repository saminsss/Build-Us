import React from 'react';
import {
	Box,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			height: '100vh',
			display: 'flex',
			flexDirection: 'column'
		},
		introBackground: {
			minWidth: '100%',
			minHeight: '93vh',
			backgroundColor: '#54a3f1',
			borderRadius: '0px 0px 250% 0px',
			zIndex: -10
		}
	}
});

const Home = () => {
	const styles = useStyles();

	return (
		<Box className={styles.page}>
			<Box className={styles.introBackground}>
			</Box>
		</Box>
	);
};

export default Home;
