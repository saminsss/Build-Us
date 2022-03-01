import React, { useState } from 'react'
import { useHistory } from 'react-router';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemText,
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
} from '@material-ui/core'
import {
	ExpandMore,
	MenuOutlined
} from '@material-ui/icons';
import MenuBox from './NavBarList';
import Drawer from './Drawer';

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.primary.light
		},
		menuButton: {
			color: theme.palette.primary.main,
			minWidth: theme.spacing(1)
		},
		title: {
			fontFamily: 'Quicksand',
			fontSize: 32,
			fontWeight: 'bold',
		},
		listitem: {
			cursor: 'pointer',
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6)
		}
	}
});

function NavBar({ title, items, breakpointUp }) {
	const styles = useStyles();

	const history = useHistory();
	const [state, setState] = useState({});
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleHover = (e, b) => {
		setState(() => {
			return { [e]: b };
		});
	}

	return (
		<Box>
			<AppBar
				className={styles.appbar}
				elevation={0}
			>
				<Toolbar>
					<Typography className={styles.title}>{title}</Typography>
				</Toolbar>
				<Toolbar>
					{breakpointUp &&
						<Box>
							<List style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}>

								{items?.map((item, index) => (
									<Box
										key={index}
										onMouseOver={() => item.subitems && handleHover(item.name, true)}
										onMouseLeave={() => item.subitems && handleHover(item.name, false)}
									>
										<ListItem
											className={styles.listitem}
											onClick={() => history.push(item.path)}
										>
											<ListItemText>
												<Typography variant='subtitle1'>
													{item.name}
												</Typography>
											</ListItemText>
											{item.subitems && <ExpandMore />}
										</ListItem>

										{state[item.name] && <MenuBox items={item.subitems} />}
									</Box>
								))}
							</List>
						</Box>

					}
					{!breakpointUp &&
						<Button className={styles.menuButton} onClick={() => setDrawerOpen(true)}>
							<MenuOutlined />
						</Button>
					}
				</Toolbar>
			</AppBar>
			{!breakpointUp &&
				<Drawer
					title={title}
					drawerItems={items}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			}
		</Box>
	)
}

export default NavBar;
