import React, { useState } from 'react'
import {
	Box,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Collapse,
	Typography,
	makeStyles,
} from '@material-ui/core'
import {
	ExpandMore,
	KeyboardArrowRight
} from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme) => {
	return {
		active: {
			borderRadius: 12,
			marginTop: theme.spacing(0.6),
			background: theme.palette.secondary.light,
			'&:hover': {
				background: theme.palette.secondary.light
			},
			color: theme.palette.primary.contrastText,
			paddingTop: theme.spacing(0.5),
			paddingBottom: theme.spacing(0.5)
		},
		inactive: {
			borderRadius: 12,
			marginTop: theme.spacing(0.6),
			'&:hover': {
				background: theme.palette.secondary.light
			},
			paddingTop: theme.spacing(0.5),
			paddingBottom: theme.spacing(0.5)
		},
		subHeader: {
			color: theme.palette.primary.dark,
			marginTop: theme.spacing(1)
		},
		icon: {
			minWidth: theme.spacing(5),
		}
	}
});

function DrawerListItems({ list, setDrawerOpen }) {
	const styles = useStyles();

	const [state, setState] = useState({});
	const history = useHistory();
	const location = useLocation();

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
		<List>
			{list?.map((listitems, index) => (
				<Box key={index}>
					<ListSubheader classes={{ root: styles.subHeader }}>{listitems.title}</ListSubheader>
					{listitems.items.map((item, index) => (
						<Box
							key={index}>
							<ListItem
								button
								onClick={() => item.subitems ? handleClick(item.name) : handleNavigate(item.path)}
								className={location.pathname === item.path ? styles.active : styles.inactive}
							>
								<ListItemIcon className={styles.icon}>
									{item.icon}
								</ListItemIcon>
								<ListItemText>
									<Typography style={{ fontWeight: 650 }} variant='subtitle2'>
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
										className={location.pathname === subitem.path ? styles.active : styles.inactive}
									>
										<ListItemIcon className={styles.icon}>
											{subitem.icon}
										</ListItemIcon>
										<ListItemText>
											<Typography style={{ fontWeight: 650 }} variant='subtitle2'>
												{subitem.name}
											</Typography>
										</ListItemText>
									</ListItem>
								</Collapse>
							))}
						</Box>
					))}
				</Box>
			))}
		</List>
	)
}

export default DrawerListItems;