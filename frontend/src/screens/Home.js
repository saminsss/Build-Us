import React, { useState, useEffect } from 'react';

import {
	Box,
	Grid,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
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
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			fontFamily: 'Quicksand',
			overflow: 'hidden',
		},
		image: {
			backgroundColor: 'rgba(0,0,0,0)'
		},

		introBackground: {
			minHeight: '93vh',
			backgroundColor: '#54a3f1',
			borderRadius: '0px 0px 1800px 0px',
		},
		intro: {
			textAlign: 'center',
			marginTop: theme.spacing(15),
			paddingLeft: theme.spacing(1),
			paddingRight: theme.spacing(1),
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
			padding: theme.spacing(3)
		},

		featuredBackground: {
			backgroundColor: 'white',
		},
		featured: {
			textAlign: 'center',
			marginTop: theme.spacing(6),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
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
				<Grid container spacing={2} alignItems='center' className={styles.intro}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.introText}>Organize And Automate Your</Typography>
						<Grow in={animation} timeout={{ enter: 1000, exit: 800 }} onExited={() => changeServiceText()}>
							<Typography className={styles.serviceText}>{services[serviceTextIndex]}</Typography>
						</Grow>
						<Typography className={styles.descriptionText}>Seamless choice for managing your teaching or agency business. Easily manage scheduling, students, clients, billing and more!</Typography>

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


			{/*Teaching/Tutoring*/}
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

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your clients to easily book, request, join and reschedule their own lessons.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Quickly switch between various calendars and views, spot conflicts, copy lessons, drag-and-drop lessons to update lesson data and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5012dc0098d648d34a23e_cal.svg" />
						</Paper>
					</Grid>
				</Grid>


				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Get Paid Faster</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Offer flexible billing options including hourly billing, package billing, flat fees or a combination to accommodate your clients’ needs.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Generate single invoices, multiple invoices, or automate your invoicing.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send automatic Invoice Due Reminders and Low Package Balance Alerts to your clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your clients to pay online, or process payments on their behalf.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Accept upfront credit card payments when new and existing clients book lessons, join classes or enroll in courses.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5250a62d6f17bc8a9fd59_pay-online.svg" />
						</Paper>
					</Grid>
				</Grid>


				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Get More Clients</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Integrate the Website Booking Plugin with your existing website to make the sign-up process quick and easy.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Showcase your tutors & teachers, their experience and their skills on your website to attract more clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Manage new leads efficiently using Custom Forms and Follow Ups.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Try out different types of lessons including Online, In-Person, or Group Lessons.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Manage online lessons through Lessonspace, Zoom, Google Meet and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a68bcd1c9d9ffe724d8f13_clients.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Improve Communication</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send automatic Lesson Reminders by email or SMS to reduce no-shows.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Easily customize email templates and send emails automatically based on your requirements.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Record detailed Lesson Notes and send a copy to your clients to keep them updated.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your tutors & teachers to flag lessons to be reviewed by administrators or staff.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Provide employees with access to valuable resources and information right on their profile.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send emails in bulk to single recipients, all students in a class and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a540d73552efa383fc7afa_comms.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Equip Your Tutors & Teachers</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Delegate scheduling and other tasks to your tutors & teachers with granular permission settings.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Eliminate the need for timesheets as hours & earnings are calculated automatically as lessons are scheduled.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow tutors & teachers to update their availability, schedule lessons and keep track of non-teaching tasks and earnings.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Let tutors & teachers update their bio, subjects, and other information and share this on your website to attract new clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									If your tutors & teachers are independent contractors, you can allow them to invoice your company directly.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send emails in bulk to single recipients, all students in a class and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5409d9377f47c5ce18b62_teachers.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Grow Your Business</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Use our various reports to keep track of business performance and easily identify opportunities for growth.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Add additional locations, branches, or switch to a franchise system without outgrowing the software.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Use bulk actions to quickly update records whether it’s one or one thousand at a time.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Choose from free integrations & add-ons that allow you to extend the functionality of your account to meet the needs of your growing business.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a542194310eb1879b1d805_stats.svg" />
						</Paper>
					</Grid>
				</Grid>


				{/*Agency*/}
				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12}>
						<Typography className={styles.featuredTitle}>How BuildUs Can Help Your Agency Business</Typography>
					</Grid>



					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Simplify Scheduling</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Speed up scheduling for one-on-one client meetings using our many calendar views and time-savers.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your clients to easily book, request, join and reschedule their meetings.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Quickly switch between various calendars and views, spot conflicts, copy meetings, drag-and-drop meeting to update meeting data and more.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Set notes to review meeting topics and set reminders to remind clients about their meetings
								</ListItemText>
							</ListItem>

						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5012dc0098d648d34a23e_cal.svg" />
						</Paper>
					</Grid>
				</Grid>


				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Get Paid Faster</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Offer flexible billing options including hourly billing, package billing, flat fees or a combination to accommodate your clients’ needs.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Generate single invoices, multiple invoices, or automate your invoicing.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send automatic Invoice Due Reminders and Low Package Balance Alerts to your clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your clients to pay online, or process payments on their behalf.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Accept upfront credit card payments when new and existing clients book lessons, join classes or enroll in courses.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5250a62d6f17bc8a9fd59_pay-online.svg" />
						</Paper>
					</Grid>
				</Grid>


				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Get More Clients</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Integrate the Website Booking Plugin with your existing website to make the sign-up process quick and easy.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Showcase your tutors & teachers, their experience and their skills on your website to attract more clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Manage new leads efficiently using Custom Forms and Follow Ups.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Try out different types of lessons including Online, In-Person, or Group Lessons.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Manage online lessons through Lessonspace, Zoom, Google Meet and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a68bcd1c9d9ffe724d8f13_clients.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Improve Communication</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send automatic Lesson Reminders by email or SMS to reduce no-shows.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Easily customize email templates and send emails automatically based on your requirements.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Record detailed Lesson Notes and send a copy to your clients to keep them updated.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow your tutors & teachers to flag lessons to be reviewed by administrators or staff.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Provide employees with access to valuable resources and information right on their profile.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send emails in bulk to single recipients, all students in a class and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a540d73552efa383fc7afa_comms.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Equip Your Tutors & Teachers</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Delegate scheduling and other tasks to your tutors & teachers with granular permission settings.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Eliminate the need for timesheets as hours & earnings are calculated automatically as lessons are scheduled.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Allow tutors & teachers to update their availability, schedule lessons and keep track of non-teaching tasks and earnings.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Let tutors & teachers update their bio, subjects, and other information and share this on your website to attract new clients.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									If your tutors & teachers are independent contractors, you can allow them to invoice your company directly.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Send emails in bulk to single recipients, all students in a class and more.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a5409d9377f47c5ce18b62_teachers.svg" />
						</Paper>
					</Grid>
				</Grid>



				<Grid container spacing={2} direction='row-reverse' className={styles.featured}>
					<Grid item xs={12} md={6}>
						<Typography className={styles.featuredSubtitle}>Grow Your Business</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Use our various reports to keep track of business performance and easily identify opportunities for growth.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Add additional locations, branches, or switch to a franchise system without outgrowing the software.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Use bulk actions to quickly update records whether it’s one or one thousand at a time.
								</ListItemText>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<Done />
								</ListItemIcon>
								<ListItemText>
									Choose from free integrations & add-ons that allow you to extend the functionality of your account to meet the needs of your growing business.
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Paper elevation={0}>
							<img height='70%' width='70%' alt="" src="https://uploads-ssl.webflow.com/601a133a769fa8f8d45d95ba/61a542194310eb1879b1d805_stats.svg" />
						</Paper>
					</Grid>
				</Grid>
			</Box>

		</Box >
	);
};

export default Home;
