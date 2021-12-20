import React, { useEffect, useState } from 'react'
import {
	Box,
	Drawer,
	Typography,
	makeStyles,
} from '@material-ui/core'

import DrawerList from './DrawerList';

function DrawerBar({ list, drawerWidth, drawerType, drawerAnchor, setDrawerOpen, drawerOpen }) {
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
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: theme.spacing(2)
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
			<Box className={styles.title}>
				<Typography variant='h5'>
					Drawer
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