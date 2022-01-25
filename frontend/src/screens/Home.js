import React, { useState, useEffect } from 'react';

import {
	Box,
	Grid,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	SvgIcon,
	makeStyles,
	Typography,
	Button,
} from '@material-ui/core';

import {
	Done
} from '@material-ui/icons';

import { Grow } from '@material-ui/core';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			margin: 0,
			padding: 0,
			maxWidth: '98.8%',
			display: 'flex',
			flexDirection: 'column',
			fontFamily: 'Quicksand',

		},
		image: {
			backgroundColor: 'rgba(0,0,0,0)'
		},

		introBackground: {
			margin: 0,
			padding: 0,
			minHeight: '93vh',
			backgroundColor: '#54a3f1',
			borderRadius: '0px 0px 1800px 0px',
		},
		intro: {
			textAlign: 'center',
			marginTop: theme.spacing(18)
		},
		introText: {
			fontSize: '30px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.primary.main
		},
		descriptionText: {
			fontFamily: 'Quicksand',
		},
		serviceText: {
			fontSize: '50px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(2),
		},
		button: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},

		featuredBackground: {
			marginTop: 0,
			padding: 0,
			maxWidth: '98.8%',
			minHeight: '100vh',
			backgroundColor: 'white',
		},
		featured: {
			textAlign: 'center',
			marginTop: theme.spacing(4)
		},
		featuredSectionTitle: {
			fontSize: '20px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: '#32CD32',
			marginBottom: theme.spacing(1.5)
		},
		featuredTitle: {
			fontSize: '30px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(1.5)
		},
		featuredSubtitle: {
			fontSize: '20px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(1.5)
		}
	}
});

const Home = () => {
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


	const services = ['Tutoring Company', 'Test Prep Center', 'Agency Company'];

	const changeServiceText = () => {
		setServiceTextIndex((prev) => (prev + 1) % services.length);
	}

	return (
		<Box className={styles.page}>

			<Box className={styles.introBackground}>
				<Grid container spacing={2} className={styles.intro}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.introText}>Organize And Automate Your</Typography>
						<Grow in={animation} timeout={{ enter: 1000, exit: 800 }} onExited={() => changeServiceText()}>
							<Typography className={styles.serviceText}>{services[serviceTextIndex]}</Typography>
						</Grow>
						<Typography className={styles.descriptionText}>Easily manage scheduling, students, billing and more!</Typography>

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
							<img height='100%' width='100%' src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/618942c3168c6ef370fa300a_605ba0366f78a18fa58445d0_laptop3%20(1).svg" />
						</Paper>

					</Grid>
				</Grid>
			</Box>


			<Box className={styles.featuredBackground}>
				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12}>

						<Typography className={styles.featuredSectionTitle}>Our Features</Typography>
						<Typography className={styles.featuredTitle}>How BuildUs Can Help Your Teaching Business</Typography>

					</Grid>

					<Grid item xs={12} md={6}>

						<Typography className={styles.featuredSubtitle}>Simplify Scheduling</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Speed up scheduling for one-on-one and group lessons using our many calendar views and time-savers.
								</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your tutors & teachers to manage their own schedules and complete lessons with ease.
								</ListItemText>

							</ListItem>
						</List>
					</Grid>

					<Grid item xs={12} md={6}>

						<Paper elevation={0}>
							<img height='80%' width='80%' src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5012dc0098d648d34a23e_cal.svg" />
						</Paper>

					</Grid>
				</Grid>
			</Box>

		</Box>
	);
};

export default Home;
