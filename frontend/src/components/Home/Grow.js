import React from 'react';

import {
	Box,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			width: '100%',
			height: '100%',
			paddingTop: theme.spacing(8),
			paddingBottom: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundImage: 'url(https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61854dd04e61c933221fc418_map.svg)',
		},
		container: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			width: '80%',
		},
		sectionMainTitle: {
			fontSize: '20px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: '#32CD32',
			marginBottom: theme.spacing(1.5)
		},
		sectionTitle: {
			fontSize: '30px',
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(4)
		},
		sectionContent: {
			textAlign: 'center'
		},
	}
});

const Works = () => {
	const styles = useStyles();

	return (
		<Box className={styles.page}>
			<Box className={styles.container}>

				<Box className={styles.sectionMainTitle}>
					Grow With Us
				</Box>
				<Box className={styles.sectionTitle}>
					Built to Grow With Your Business
				</Box>
				<Box className={styles.sectionContent}>
					Whether you have 10 students or 10,000, Teachify is loaded with features to make managing large quantities of students, tutors/teachers and lessons faster & more efficient. If you have plans to expand to multiple locations or build a franchise system, Teachify provides the tools to help you manage and monitor multiple locations from a single master account.
				</Box>
			</Box>
		</Box>
	);
};

export default Works;
