import React from 'react';
import { useHistory } from 'react-router';
import {
	Box, Card, List, Avatar,
	CardContent, ListItemIcon, ListItemText,
	ListItem, makeStyles, Typography
} from '@material-ui/core';
import { Settings, AccountCircle, ExitToApp } from '@material-ui/icons';
import Cookies from 'js-cookie';
import axios from 'axios';
import Authentication from '../Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const useStyles = makeStyles((theme) => {
	return {
		cardcontent: {
			padding: theme.spacing(0),
			"&:last-child": {
				paddingBottom: 0,
			},
		},
		avatar: {
			marginRight: theme.spacing(1.5),
			backgroundColor: theme.palette.secondary.dark,
		},
		nameBox: {
			display: 'flex',
			flexDirection: 'column'
		},
		icon: {
			minWidth: '40px',
		},
	}
});

function AccountBox(props) {
	const styles = useStyles();
	const history = useHistory();

	const signOut = async () => {
		await Axios.post('http://localhost:5000/auth/signout', {
			token: Cookies.get('refreshToken')
		});
	}

	const list = [
		{
			name: 'Profile',
			icon: <AccountCircle color='primary.dark' />,
			path: '/dashboard'
		},
		{
			name: 'Settings',
			icon: <Settings color='primary.dark' />,
			path: '/settings'
		}

	]

	return (
		<Box {...props}>
			<Card>
				<CardContent className={styles.cardcontent}>
					<List>
						<ListItem>
							<ListItemIcon>
								<Avatar className={styles.avatar}>
									{props.user?.email[0].toUpperCase()}
								</Avatar>
							</ListItemIcon>
							<ListItemText>
								{props.user.name}
								{props.user.email}
							</ListItemText>
						</ListItem>

						{list.map((item, index) => (
							<ListItem
								key={index}
								button
								onClick={() => history.push('/profile')}
							>
								<ListItemIcon className={styles.icon}>
									{item.icon}
								</ListItemIcon>
								<ListItemText>
									<Typography style={{ fontWeight: 500 }} variant='subtitle2'>
										{item.name}
									</Typography>
								</ListItemText>
							</ListItem>
						))}

						<ListItem
							button
							onClick={() => {
								signOut();
								Cookies.remove('accessToken');
								Cookies.remove('refreshToken');
								Cookies.remove('remember');
								Cookies.remove('id');
								return (
									history.push('/')
								)
							}}
						>
							<ListItemIcon className={styles.icon}>
								<ExitToApp />
							</ListItemIcon>
							<ListItemText>
								<Typography style={{ fontWeight: 500 }} variant='subtitle2'>
									Logout
								</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</Box>
	)
}

export default AccountBox;
