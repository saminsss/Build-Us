import React, { useState, useEffect } from 'react'
import {
	AppBar,
	Toolbar,
	Avatar,
	makeStyles,
} from '@material-ui/core'

import AccountBox from './AccountBox';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
	return {
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

function AppNavBar({ user }) {

	const styles = useStyles();


	const [accountBox, setAccountBox] = useState(false);

	const openAccountCard = () => {
		setAccountBox(!accountBox);
	}

	return (
		<AppBar
			className={styles.appbar}
			elevation={0}
		>
			<Toolbar>
				<Avatar className={styles.avatar} onClick={() => { openAccountCard() }}>
					{user?.email[0].toUpperCase()}
				</Avatar>

			</Toolbar>
			{accountBox && <AccountBox user={user} className={styles.accountBox}></AccountBox>}
		</AppBar>
	)
}

export default AppNavBar;