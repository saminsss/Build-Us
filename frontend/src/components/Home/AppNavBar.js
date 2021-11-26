import React, { useState } from 'react'
import { useHistory } from 'react-router';
import {
	Box,
	List,
	ListItem,
	ListItemText,
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
} from '@material-ui/core'
import {
	ExpandMore
} from '@material-ui/icons';
import MenuBox from './MenuBox';

const useStyles = makeStyles((theme) => {
	return {
		appbar: {
			display: 'flex',
			alignItems: 'flex-end',
			justifyContent: 'center',
			backgroundColor: 'rgba(255,255,255,0)',
			color: theme.palette.primary.light,
			minWidth: theme.spacing(100)
		},
		listitem: {
			cursor: 'pointer',
			paddingLeft: theme.spacing(6),
			paddingRight: theme.spacing(6),
			paddingBottom: 0
		}
	}
});

function AppNavBar({ items }) {
	const styles = useStyles();
	const [state, setState] = useState({});
	const history = useHistory();

	const handleHover = (e, b) => {
		setState(() => {
			return { [e]: b };
		});
	}

	return (
		<Box
			onMouseLeave={() => handleHover('')}
		>
			<AppBar
				className={styles.appbar}
				elevation={0}
			>
				<Toolbar>
					<List style={{
						display: 'flex'
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
										<Typography style={{ fontSize: 16.5, fontWeight: 375 }} variant='subtitle2'>
											{item.name}
										</Typography>
									</ListItemText>
									{item.subitems && <ExpandMore />}
								</ListItem>

								{state[item.name] && <MenuBox items={item.subitems} />}
							</Box>
						))}
					</List>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default AppNavBar;
