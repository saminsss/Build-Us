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

const useStyles = makeStyles((theme) => {
	return {
		page: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
		},
		image: {
			backgroundColor: 'rgba(0,0,0,0)'
		},

		introBackground: {
			minHeight: '93vh',
			backgroundColor: '#54a3f1',
			backgroundImage: 'url(https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61856827909fb72472abfc6c_601da34bc4b63f405a9e97f1_bg-test2.svg)',
			borderRadius: '0px 0px 1800px 0px',
		},
		intro: {
			textAlign: 'center',
			marginTop: theme.spacing(15),
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
		},
		introText: {
			fontSize: '38px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.primary.main
		},
		descriptionText: {
			fontFamily: 'Quicksand',
		},
		serviceText: {
			fontSize: '32px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(2),
		},
		button: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			padding: theme.spacing(2.4)
		},
	}
});

const Introduction = () => {
	const styles = useStyles();

	const [animation, setAnimation] = useState(true);
	const [serviceTextIndex, setServiceTextIndex] = useState(0);

	const history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setAnimation((prev) => !prev);
		}, 2500);
		return () => clearInterval(interval);
	}, []);


	const services = ['Tutoring Company', 'Test Preparation School', 'Driving School', 'Music School'];

	const changeServiceText = () => {
		setServiceTextIndex((prev) => (prev + 1) % services.length);
	}

	return (
		<Box className={styles.page}>

			<Box className={styles.introBackground}>
				<Grid container spacing={2} alignItems='center' className={styles.intro}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.introText}>Organize And Automate Your</Typography>
						<Grow in={animation} timeout={{ enter: 1000, exit: 600 }} onExited={() => changeServiceText()}>
							<Typography className={styles.serviceText}>{services[serviceTextIndex]}</Typography>
						</Grow>
						<Typography className={styles.descriptionText}>Seamless choice for managing your teaching business. Easily manage scheduling, students, clients, billing and more!</Typography>

						<Button
							variant='contained'
							color='secondary'
							onClick={() => history.push({
								pathname: '/home'
							})}
							className={styles.button}
						>
							Try it for free
						</Button>
						<Typography className={styles.descriptionText}>or Take a Quick Tour</Typography>
					</Grid>

					<Grid item xs={12} md={6}>

						<Paper elevation={0} className={styles.image}>
							<img height='100%' width='100%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/618942c3168c6ef370fa300a_605ba0366f78a18fa58445d0_laptop3%20(1).svg" />
						</Paper>

					</Grid>
				</Grid>
			</Box>

		</Box >
	);
};

export default Introduction;
