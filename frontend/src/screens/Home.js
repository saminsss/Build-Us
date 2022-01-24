import React, { useState, useEffect } from 'react';

import {
	Box,
	makeStyles,
	useTheme,
	useMediaQuery,
	Typography,
} from '@material-ui/core';

import { Grow } from '@material-ui/core';

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
		},
		introAbsolute: {
			paddingTop: theme.spacing(18),
			paddingLeft: theme.spacing(18),
			paddingRight: theme.spacing(18),
		},
		introCenter: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: theme.spacing(5),
			paddingLeft: theme.spacing(10),
			paddingRight: theme.spacing(10)
		},
		introText: {
			fontSize: '30px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand, cursive',
			color: theme.palette.primary.main
		},
		serviceText: {
			fontSize: '50px',
			fontFamily: 'Bungee Inline, cursive',
			color: theme.palette.secondary.main
		}
	}
});

const Home = () => {
	const styles = useStyles();
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	const [animation, setAnimation] = useState(true);
	const [serviceTextIndex, setServiceTextIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimation((prev) => !prev);
		}, 2500);
		return () => clearInterval(interval);
	}, []);


	const services = ['Tutoring Company', 'Test Prep Center', 'Agency Company'];

	const changeServiceText = () => {
		setServiceTextIndex((prev) => (prev + 1) % services.length);
	}

	return (
		<Box className={styles.page}>
			<Box className={styles.introBackground}>
				<Box className={isMdUp ? styles.introAbsolute : styles.introCenter}>
					<Typography className={styles.introText}>Organize And Automate Your</Typography>
					<Grow in={animation} timeout={{ enter: 1000, exit: 800 }} mountOnEnter unmountOnExit onExited={() => changeServiceText()}>
						<Typography className={styles.serviceText}>{services[serviceTextIndex]}</Typography>
					</Grow>
				</Box>

			</Box>
		</Box>
	);
};

export default Home;
