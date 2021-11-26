import React, { useState, useEffect } from 'react'
import {
	Box,
	makeStyles,
} from '@material-ui/core'
import DrawerNavBar from '../DrawerLayout/DrawerNavBar';
import DrawerBar from '../DrawerLayout/DrawerBar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Authentication from '../Core/Authentication';


const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex'
		},
		page: {
			background: theme.palette.primary.main,
			width: '100%'
		},
		toolbar: theme.mixins.toolbar,
	}
});

function DrawerLayout(props) {
	const styles = useStyles();

	const [user, setUser] = useState();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const res = await Axios.get('/users/' + Cookies.get('id'), { params: { id: Cookies.get('id') } });
		setUser(res.data);
	};

	return (
		<Box className={styles.root}>
			{user && <DrawerNavBar user={user} />}
			{user && <DrawerBar user={user} />}
			<Box className={styles.page}>
				<Box className={styles.toolbar}></Box>
				{props.children}
			</Box>
		</Box >
	)
}

export default DrawerLayout;
