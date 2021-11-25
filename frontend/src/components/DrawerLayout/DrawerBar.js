import React, { useEffect, useState } from 'react'
import {
	Box,
	Drawer,
	Typography,
	makeStyles,
} from '@material-ui/core'
import getDrawerContents from './Functions/getDrawerContents';
import DrawerList from './DrawerList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			background: theme.palette.secondary.main,
			color: theme.palette.primary.main,
			padding: theme.spacing(1),
			width: drawerWidth,
		},
		title: {
			padding: theme.spacing(2)
		}
	}
});

function DrawerBar({ user }) {
	const styles = useStyles();
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(getDrawerContents(user));
	}, [user])

	return (
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

			<DrawerList list={list} />
		</Drawer>
	)
}

export default DrawerBar;