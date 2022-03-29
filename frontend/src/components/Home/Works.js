import React from 'react';

import {
	Box,
	Grid,
	Paper,
	List,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';

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

		section: {
			textAlign: 'center',
			marginTop: theme.spacing(6),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),

			backgroundColor: 'white',
		},
		sectionTitle: {
			fontSize: '30px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(1.5)
		},
	}
});

const Works = () => {
	const styles = useStyles();

	return (
		<Box className={styles.page}>

			{/*How it works*/}
			<Box>
				<Grid container spacing={2} className={styles.section} justifyContent='center'>
					<Grid item xs={12}>
						<Typography className={styles.sectionTitle}>How it Works</Typography>
					</Grid>


					<Grid item xs={12}>
						<Paper elevation={0}>
							<img width='90%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/60f9bde2627dbc23fd595206_test6.svg" />
						</Paper>
					</Grid>

					<Grid item xs={6} md={3}>
						<List>
							<ListItemText>
								1. Add Students & Tutors/Teachers
							</ListItemText>
							Add students and teachers one at a time or import them in bulk.

						</List>
					</Grid>
					<Grid item xs={6} md={3}>
						<List>
							<ListItemText>
								2. Schedule Lessons
							</ListItemText>
							Add lessons to the calendar or have clients book online.
						</List>
					</Grid>
					<Grid item xs={6} md={3}>
						<List >
							<ListItemText>
								3. Bill Your Clients
							</ListItemText>
							Generate invoices and process payments.
						</List>
					</Grid>
					<Grid item xs={6} md={3}>
						<List>
							<ListItemText>
								4. Grow Your Business
							</ListItemText>
							Use our reports to keep track of your business performance.

						</List>
					</Grid>
				</Grid>

			</Box>

		</Box >
	);
};

export default Works;
