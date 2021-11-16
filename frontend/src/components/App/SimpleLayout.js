import React from 'react'
import { Box, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => {
	return {
		page: {
			background: theme.palette.primary.main,
			width: '100%'
		}
	}
});

function SimpleLayout({ children }) {
	const styles = useStyles();
	return (
		<Box className={styles.page}>
			{children}
		</Box>
	)
}

export default SimpleLayout;