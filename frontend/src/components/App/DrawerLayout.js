import React, { useState, useEffect } from 'react'
import { AppBar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse, makeStyles, Toolbar, Typography, Avatar } from '@material-ui/core'
import { ExpandMore, KeyboardArrowRight, Dashboard, Person, LocalMall } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import Authentication from '../Core/Authentication';
import AccountBox from '../DrawerLayout/AccountBox';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex'
		},
		page: {
			background: theme.palette.primary.main,
			width: '100%'
		},
		appbar: {
			display: 'flex',
			alignItems: 'end',
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: `${drawerWidth}px`,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			backgroundColor: 'white',
			boxShadow: '0px 1px 0px 0px rgba(200, 200, 200, .6)'
		},
		toolbar: theme.mixins.toolbar,
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			background: theme.palette.secondary.main,
			width: drawerWidth,
			color: theme.palette.primary.main,
			padding: theme.spacing(1)
		},
		title: {
			padding: theme.spacing(2)
		},
		active: {
			borderRadius: 12,
			marginTop: theme.spacing(0.6),
			background: theme.palette.secondary.light,
			'&:hover': {
				background: theme.palette.secondary.light
			},
			color: theme.palette.secondary.contrastText,
			paddingTop: theme.spacing(0.5),
			paddingBottom: theme.spacing(0.5)
		},
		inactive: {
			borderRadius: 12,
			marginTop: theme.spacing(0.6),
			'&:hover': {
				background: theme.palette.secondary.light
			},
			paddingTop: theme.spacing(0.5),
			paddingBottom: theme.spacing(0.5)
		},
		subHeader: {
			color: theme.palette.primary.dark,
			marginTop: theme.spacing(1)
		},
		icon: {
			minWidth: '40px',
		},
		avatar: {
			marginLeft: theme.spacing(1),
			backgroundColor: theme.palette.secondary.dark,
			'&:hover': {
				cursor: 'pointer'
			},
		},
		accountBox: {
			display: 'block',
			position: 'absolute',
			marginTop: theme.spacing(8.5),
			marginRight: theme.spacing(0.25),
		}
	}
});

function DrawerLayout(props) {
	const [state, setState] = useState({});
	const [user, setUser] = useState();
	const [account, setAccount] = useState(false);
	const styles = useStyles();
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleClick = (e) => {
		setState(prevState => {
			return { ...prevState, [e]: !state[e] };
		});
	}

	const fetchUsers = async () => {
		const res = await Axios.get('http://localhost:5000/users/' + Cookies.get('id'), { params: { id: Cookies.get('id') } });
		setUser(res.data);
	};

	const openAccountCard = () => {
		setAccount(!account);
	}


	let list;
	if (user?.role === 'A') {
		list = [
			{
				title: 'General',
				items: [
					{
						name: 'Dashboard',
						icon: <Dashboard color='primary' />,
						path: '/dashboard'
					}
				]
			},
			{
				title: 'Management',
				items: [
					{
						name: 'Customers',
						icon: <Person color='primary' />,
						path: '/customers'
					},
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								id: 1,
								name: 'List',
								path: '/products'
							}
						]
					}
				]
			}
		];
	}
	else if (user?.role === 'E') {
		list = [
			{
				title: 'Management',
				items: [
					{
						name: 'Customers',
						icon: <Person color='primary' />,
						path: '/customers'
					},
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								id: 1,
								name: 'List',
								path: '/products'
							}
						]
					}
				]
			}
		];
	}
	else {
		list = [
			{
				title: 'General',
				items: [
					{
						id: 1,
						name: 'Dashboard',
						icon: <Dashboard color='primary' />,
						path: '/dashboard'
					}
				]
			},
			{
				title: 'Management',
				items: [
					{
						name: 'Products',
						icon: <LocalMall color='primary' />,
						subitems: [
							{
								name: 'List',
								path: '/products'
							}
						]
					}
				]
			}
		];
	}

	return (
		<Box className={styles.root}>
			<AppBar
				className={styles.appbar}
				elevation={0}
			>
				<Toolbar>
					<Avatar className={styles.avatar} onClick={() => { openAccountCard() }}>
						{user?.email[0].toUpperCase()}
					</Avatar>

				</Toolbar>
				{account ? <AccountBox user={user} className={styles.accountBox}></AccountBox> : null}
			</AppBar>
			<Drawer
				className={styles.drawer}
				classes={{ paper: styles.drawerPaper }}
				variant='permanent'
				anchor='left'
			>
				<Box className={styles.title}>
					<Typography variant='h5'>
						Drawer
					</Typography>
				</Box>

				<List>
					{list.map((listitems, index) => (
						<Box key={index}>
							<ListSubheader classes={{ root: styles.subHeader }}>{listitems.title}</ListSubheader>
							{listitems.items.map((item, index) => (
								<Box
									key={index}>
									<ListItem
										button
										onClick={() => item.subitems ? handleClick(item.name) : history.push(item.path)}
										className={location.pathname === item.path ? styles.active : styles.inactive}
									>
										<ListItemIcon className={styles.icon}>
											{item.icon}
										</ListItemIcon>
										<ListItemText>
											<Typography style={{ fontWeight: 650 }} variant='subtitle2'>
												{item.name}
											</Typography>
										</ListItemText>
										{item.subitems ? state[item.name] ? <ExpandMore /> : <KeyboardArrowRight /> : null}
									</ListItem>
									{item.subitems?.map((subitem, index) => (
										<Collapse key={index} in={state[item.name]} timeout="auto" unmountOnExit>
											<ListItem
												button
												onClick={() => history.push(subitem.path)}
												className={location.pathname === subitem.path ? styles.active : styles.inactive}
											>
												<ListItemIcon className={styles.icon}>
													{subitem.icon}
												</ListItemIcon>
												<ListItemText>
													<Typography style={{ fontWeight: 650 }} variant='subtitle2'>
														{subitem.name}
													</Typography>
												</ListItemText>
											</ListItem>
										</Collapse>
									))}
								</Box>
							))}
						</Box>
					))}
				</List>
			</Drawer>
			<Box className={styles.page}>
				<Box className={styles.toolbar}></Box>
				{props.children}
			</Box>
		</Box >
	)
}

export default DrawerLayout;
