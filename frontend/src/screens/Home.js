import React, { useState } from 'react'
import {
	Box,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	AppBar,
	Toolbar,
	Collapse,
	Typography,
	makeStyles,
} from '@material-ui/core'
import {
	ExpandMore
} from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			height: '100vh',
			backgroundColor: '#54a3f1'
		},
		appbar: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: 'rgba(0,0,0,1)',
			color: theme.palette.primary.light
		}
	}
});

const Home = () => {
	const styles = useStyles();
	const [state, setState] = useState({});
	const history = useHistory();

	const handleClick = (e) => {
		setState(prevState => {
			return { ...prevState, [e]: !state[e] };
		});
	}

	const list =
		[
			{
				name: 'Features',
				path: '/features'
			},
			{
				name: 'Solutions',
				subitems:
					[
						{
							name: 'Tutoring',
							path: '/solutions/tutoring'
						},
						{
							name: 'Commerce',
							path: '/solutions/commerce'
						}
					]
			},
			{
				name: 'Pricing',
				path: '/pricing'
			},
			{
				name: 'Support',
				subitems:
					[
						{
							name: 'Getting Started Guide',
							path: '/support/getting-started'
						},
						{
							name: 'Knowledge Base',
							path: 'knowledge-base'
						}
					]
			},
			{
				name: 'Sign In',
				path: '/signin'
			}
		]

	return (
		<Box className={styles.page}>
			<AppBar
				className={styles.appbar}
				elevation={0}
			>
				<Toolbar>
					<List style={{
						display: 'flex',
						alignItems: 'start',
						justifyContent: 'center',
						padding: 0
					}}>
						{list.map((item, index) => (
							<Box key={index}>
								<ListItem
									button
									onClick={() => item.subitems ? handleClick(item.name) : history.push(item.path)}
								>
									<ListItemText>
										<Typography style={{ fontWeight: 550 }} variant='subtitle2'>
											{item.name}
										</Typography>
									</ListItemText>
									{item.subitems && <ExpandMore />}
								</ListItem>
								{item.subitems?.map((subitem, index) => (
									<Collapse key={index} in={state[item.name]} timeout="auto" unmountOnExit>
										<ListItem
											button
											onClick={() => history.push(subitem.path)}
										>
											<ListItemText>
												<Typography style={{ fontWeight: 550 }} variant='subtitle2'>
													{subitem.name}
												</Typography>
											</ListItemText>
										</ListItem>
									</Collapse>
								))}
							</Box>
						))}
					</List>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Home;
