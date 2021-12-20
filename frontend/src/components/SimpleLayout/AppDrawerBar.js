import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	Typography,
	makeStyles,
	Button,
} from '@material-ui/core'
import {
	ExpandMore,
	KeyboardArrowRight,
	CloseOutlined
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
	return {
		drawer: {
			width: '100%'
		},
		drawerPaper: {
			background: theme.palette.secondary.main,
			color: theme.palette.primary.main,
			padding: theme.spacing(1),
			width: '100%',
		},
		title: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: theme.spacing(2)
		},
		closeButton: {
			color: theme.palette.primary.main,
			minWidth: theme.spacing(2)
		}
	}
});

function AppDrawerBar({ drawerItems, setDrawerOpen, drawerOpen }) {

	const styles = useStyles();
	const history = useHistory();
	const [state, setState] = useState({});
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(drawerItems)
	}, [drawerItems])

	const handleClick = (e) => {
		setState(prevState => {
			return { ...prevState, [e]: !state[e] };
		});
	};

	const handleNavigate = (path) => {
		history.push(path);
		setDrawerOpen(false);
	};

	return (
		<Drawer
			className={styles.drawer}
			classes={{ paper: styles.drawerPaper }}
			variant='temporary'
			open={drawerOpen}
			anchor='top'
			onClose={() => setDrawerOpen(false)}
		>
			<Box className={styles.title}>
				<Typography variant='h5'>
					Drawer
				</Typography>
				<Button className={styles.closeButton} onClick={() => setDrawerOpen(false)}>
					<CloseOutlined />
				</Button>

			</Box>

			<List>
				{items?.map((item, index) => (
					<Box key={index}>
						<ListItem
							button
							onClick={() => item.subitems ? handleClick(item.name) : handleNavigate(item.path)}
						>
							<ListItemText>
								<Typography variant='subtitle2'>
									{item.name}
								</Typography>
							</ListItemText>
							{item.subitems && (state[item.name] ? <ExpandMore /> : <KeyboardArrowRight />)}
						</ListItem>
						{item.subitems?.map((subitem, index) => (
							<Collapse key={index} in={state[item.name]} timeout="auto" unmountOnExit>
								<ListItem
									button
									onClick={() => handleNavigate(subitem.path)}
								>
									<ListItemIcon className={styles.icon}>
										{subitem.icon}
									</ListItemIcon>
									<ListItemText>
										<Typography variant='subtitle2'>
											{subitem.name}
										</Typography>
									</ListItemText>
								</ListItem>
							</Collapse>
						))}
					</Box>
				))}
			</List>
		</Drawer>
	)
};

export default AppDrawerBar;