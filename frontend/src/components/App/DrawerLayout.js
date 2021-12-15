import React, { useState, useEffect } from 'react'
import {
	Box,
	makeStyles,
	useTheme,
	useMediaQuery
} from '@material-ui/core'
import DrawerAppBar from '../DrawerLayout/DrawerAppBar';
import DrawerNavBar from '../DrawerLayout/DrawerNavBar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Authentication from '../Core/Authentication';


const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

function DrawerLayout(props) {
	const [user, setUser] = useState();
	const [drawerWidth, setDrawerWidth] = useState(220);
	const [drawerType, setDrawerType] = useState('permanent');
	const [drawerAnchor, setDrawerAnchor] = useState('left');
	const [drawerOpen, setDrawerOpen] = useState(false);

	const useStyles = makeStyles((theme) => {
		return {
			root: {
				display: 'flex'
			},
			page: {
				background: theme.palette.primary.main,
				width: `calc(100% - ${drawerWidth}px)`,
			},
			toolbar: theme.mixins.toolbar,
		}
	});

	const styles = useStyles();
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		const changeDrawerWidth = () => {
			if (isMdUp) {
				setDrawerWidth(220);
				setDrawerType('permanent');
				setDrawerAnchor('left');
			}
			else {
				setDrawerWidth(0);
				setDrawerType('temporary');
				setDrawerAnchor('left');
			}
		};
		changeDrawerWidth();
	}, [isMdUp]);

	const fetchUsers = async () => {
		const res = await Axios.get('/api/users/' + Cookies.get('id'),
			{
				params: {
					id: Cookies.get('id')
				}
			});
		setUser(res.data[0]);
	};



	return (
		<Box className={styles.root}>
			{user && <DrawerAppBar user={user} drawerWidth={drawerWidth} setDrawerOpen={setDrawerOpen} />}
			{user && <DrawerNavBar user={user} drawerWidth={220} drawerType={drawerType} drawerAnchor={drawerAnchor} setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />}
			<Box className={styles.page}>
				<Box className={styles.toolbar}></Box>
				{props.children}
			</Box>
		</Box >
	)
}

export default DrawerLayout;
