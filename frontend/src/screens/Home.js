import React, { useEffect, useState } from 'react'
import {
	Box,
	makeStyles,
	Typography,
} from '@material-ui/core'
import getNavBarContents from '../components/Home/getNavBarContents';
import AppNavBar from '../components/Home/AppNavBar';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			height: '100vh',
			background: 'linear-gradient(180deg, rgba(60,140,255,1) 0%, rgba(200,240,255,1) 85%, rgba(255,255,255,1) 95%)'
		},
		toolbar: theme.mixins.toolbar,
	}
});

const Home = () => {
	const styles = useStyles();
	const [list, setList] = useState([]);


	useEffect(() => {
		const navBarItems = getNavBarContents();
		setList(navBarItems);
	}, [])



	return (
		<Box>
			<AppNavBar items={list} />
			<Box
				className={styles.page}
			>
				<Box className={styles.toolbar}></Box>
			</Box>
		</Box>
	)
}

export default Home;
