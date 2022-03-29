import React from 'react';

import {
	Box,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Typography,
} from '@material-ui/core';

import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => {

	return {
		page: {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		footer: {
			height: '75%',
			backgroundColor: '#54a3f1',
			paddingTop: theme.spacing(5),
		},
		titleContainer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			padding: theme.spacing(2)
		},
		title: {
			fontSize: 28,
			fontWeight: 'bold',
			fontFamily: 'Quicksand',
			color: theme.palette.secondary.main,
			marginBottom: theme.spacing(4)
		},
		button: {
			margin: theme.spacing(1),
			padding: theme.spacing(2.6),
			borderRadius: 2
		},
		footerNavigation: {
			marginTop: theme.spacing(6),
			color: 'white',
			textAlign: 'center'
		},
		navigationTitle: {
			fontFamily: 'Quicksand',
			fontWeight: 'bold'
		},
		navigationItem: {
			cursor: 'pointer',
			margin: theme.spacing(2),
			fontFamily: 'Quicksand',
			fontSize: 14
		},
		copyright: {
			margin: theme.spacing(3)
		}
	}
});


const navigation = [
	{
		title: 'Navigation',
		items: [
			{
				title: 'Scheduling',
				link: '/features/scheduling'
			},
			{
				title: 'Communication',
				link: '/features/communication'
			},
			{
				title: 'Billing & Payroll',
				link: '/features/billing'
			},
			{
				title: 'Records & Analytics',
				link: '/features/records'
			},
			{
				title: 'Multiple Locations',
				link: '/features/locations'
			},
		]
	},
	{
		title: 'Resources',
		items: [
			{
				title: 'Tutorials',
				link: '/tutorials/all'
			},
			{
				title: 'Getting Started',
				link: '/getting-started/introduction'
			},
			{
				title: 'Knowledge Base',
				link: '/'
			},
			{
				title: 'Teachify Blogs',
				link: '/blogs'
			},
			{
				title: 'Client Testimonials',
				link: '/reviews'
			},
		]
	},
	{
		title: 'Solutions',
		items: [
			{
				title: 'Tutoring Centers',
				link: '/tutoring-management'
			},
			{
				title: 'Language Schools',
				link: '/language-school-manangement'
			},
			{
				title: 'Test Preparation',
				link: '/test-preparation-management'
			},
			{
				title: 'Music Schools',
				link: '/music-school-management'
			},
			{
				title: 'Driving Schools',
				link: '/driving-school-management'
			},
		]
	},
	{
		title: 'Our Company',
		items: [
			{
				title: 'About Us',
				link: '/about'
			},
			{
				title: 'Contact',
				link: '/contact'
			},
			{
				title: 'Careers',
				link: '/careers'
			}
		]
	},
	{
		title: 'Legal',
		items: [
			{
				title: 'Privacy Policy',
				link: '/privacy'
			},
			{
				title: 'Terms & Conditions',
				link: '/terms'
			}
		]
	}
]

const Introduction = () => {
	const styles = useStyles();

	const history = useHistory();
	return (
		<Box className={styles.page}>
			<Box className={styles.footer}>
				<Box className={styles.titleContainer}>
					<Typography className={styles.title}>Simplify management, save time, and grow your business.</Typography>

					<Box>
						<Button
							variant='contained'
							color='secondary'
							className={styles.button}
							onClick={() => history.push('/trial')}>
							Start your Free Trial
						</Button>
						<Button
							variant='outlined'
							className={styles.button}
							onClick={() => history.push('/tour')}>
							Take a Quick Tour
						</Button>
					</Box>
				</Box>

				<Grid container spacing={2} className={styles.footerNavigation}>
					{navigation.map((navitem, index1) => (
						<Grid key={index1} item xs={4} md>
							<Typography className={styles.navigationTitle}>
								{navitem.title}
							</Typography>
							<List>
								{navitem.items.map((subitem, index2) => (

									<ListItemText key={index2} onClick={() => history.push(subitem.link)}>
										<Typography className={styles.navigationItem}>
											{subitem.title}
										</Typography>
									</ListItemText>
								))}
							</List>
						</Grid>
					))}
				</Grid>

				<Box className={styles.copyright}>
					© Teachify 2022
				</Box>
			</Box>

		</Box >
	);
};



export default Introduction;
