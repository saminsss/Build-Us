import React from 'react';
import {
	Box,
	Card,
	CardContent,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Switch,
	FormHelperText,
	makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import Authentication from '../Core/Authentication';

const Axios = axios.create();
Authentication.setAuthentication(Axios); //set new auth tokens in req header everytime token expires

const useStyles = makeStyles((theme) => {
	return {
		cardcontent: {
			padding: theme.spacing(2),
			"&:last-child": {
				paddingBottom: theme.spacing(2),
			},
		},
	}
});

function SortBox({ sortOptions, ...rest }) {
	const styles = useStyles();

	return (
		<Box {...rest}>
			<Card>
				<CardContent className={styles.cardcontent}>
					<FormControl component="fieldset" variant="standard">
						<FormGroup>
							{sortOptions.map((field, index) => {
								return <FormControlLabel
									key={index}
									control={
										<Switch checked={true} name={field['option']} />
									}
									label={field['option']}
								/>
							})}
						</FormGroup>
					</FormControl>
				</CardContent>
			</Card>
		</Box>
	)
}

export default SortBox;
