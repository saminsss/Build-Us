import React, { useState } from 'react'
import {
	AppBar,
	Toolbar,
	Avatar,
	makeStyles,
} from '@material-ui/core'

import {
	MenuOutlined
} from '@material-ui/icons';

import AccountBox from './AccountBox';

function DrawerNavBar({ user, drawerWidth, setDrawerOpen }) {
	const useStyles = makeStyles((theme) => {
		return {
			appbar: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(['margin', 'width'], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				backgroundColor: 'white',
				boxShadow: '0px 1px 0px 0px rgba(200, 200, 200, .6)'
			},
			toolbar: {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'flex-end',
				alignItems: 'center',
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
				right: theme.spacing(0.25),
				marginTop: theme.spacing(8.5),
			},
			drawerIcon: {
				marginRight: 'auto',
				color: theme.palette.secondary.main,
				'&:hover': {
					cursor: 'pointer'
				},
			}
		}
	});

	const styles = useStyles();
	const [accountBox, setAccountBox] = useState(false);

	const openAccountCard = () => {
		setAccountBox(!accountBox);
	};

	return (
		<AppBar
			className={styles.appbar}
			elevation={0}
		>
			<Toolbar className={styles.toolbar}>
				{drawerWidth === 0 && <MenuOutlined
					className={styles.drawerIcon}
					onClick={() => setDrawerOpen(true)}
				/>}

				<Avatar
					className={styles.avatar}
					onClick={() => openAccountCard()}
				>
					{user?.email[0].toUpperCase()}
				</Avatar>
			</Toolbar>
			{accountBox && <AccountBox user={user} className={styles.accountBox}></AccountBox>}
		</AppBar>
	)
}

export default DrawerNavBar;