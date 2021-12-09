import React from 'react';
import {
	Box,
	Card,
	List,
	CardContent,
	ListItemText,
	ListItem,
	makeStyles,
} from '@material-ui/core';
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
	}
});

function SortBox(props) {
	const styles = useStyles();

	return (
		<Box {...props}>
			<Card>
				<CardContent className={styles.cardcontent}>
					<List>
						<ListItem>
							<ListItemText>
								Sort thi and that and stiff bla bla bla
							</ListItemText>
						</ListItem>
					</List>
				</CardContent>
			</Card>
		</Box>
	)
}

export default SortBox;
