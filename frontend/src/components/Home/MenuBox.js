import React from 'react';
import { useHistory } from 'react-router';
import {
	Box,
	Card,
	List,
	CardContent,
	ListItemText,
	Typography,
	ListItem,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'block',
			position: 'absolute',
			minWidth: theme.spacing(35),
			borderRadius: 20
		},
		cardcontent: {
			padding: theme.spacing(0),
			"&:last-child": {
				paddingBottom: theme.spacing(0),
			},
			backgroundColor: 'white',

		},
		listitem: {
			textAlign: 'left',
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		}
	}
});

function MenuBox({ items }) {
	const styles = useStyles();
	const history = useHistory();

	return (
		<Box className={styles.root}>
			<Card>
				<CardContent className={styles.cardcontent}>
					<List>
						{items.map((item, index) => (
							<ListItem
								key={index}
								button
								onClick={() => history.push(item.path)}

								classes={{ root: styles.listitem }}
							>
								<ListItemText>
									<Typography style={{ fontWeight: 375 }} variant='subtitle2'>
										{item.name}
									</Typography>
								</ListItemText>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</Box>
	)
}

export default MenuBox;
