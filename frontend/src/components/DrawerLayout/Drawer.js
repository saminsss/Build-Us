import React from 'react'
import {
	Box,
	Drawer,
	Typography,
	makeStyles,
} from '@material-ui/core'

import DrawerList from './DrawerList';

function DrawerBar({ title, list, drawerWidth, drawerType, drawerAnchor, setDrawerOpen, drawerOpen }) {
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
			titleContainer: {
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: theme.spacing(2)
			},
			title: {
				fontFamily: 'Quicksand',
				fontSize: 32,
				fontWeight: 'bold',
			},
		}
	});

	const styles = useStyles();

	return (
		<Drawer
			className={styles.drawer}
			classes={{ paper: styles.drawerPaper }}
			variant={drawerType}
			open={drawerOpen}
			anchor={drawerAnchor}
			onClose={() => setDrawerOpen(false)}
		>
			<Box className={styles.titleContainer}>
				<Typography className={styles.title}>
					{title}
				</Typography>
			</Box>

			<DrawerList
				list={list}
				setDrawerOpen={setDrawerOpen}
			/>
		</Drawer>
	)
}

export default DrawerBar;