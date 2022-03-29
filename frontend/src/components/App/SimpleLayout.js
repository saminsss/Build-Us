import React, { useEffect, useState } from 'react'
import {
	Box,
	useTheme,
	useMediaQuery,
	makeStyles
} from '@material-ui/core'
import getNavBarContents from '../SimpleLayout/Functions/getNavBarContents';
import NavBar from '../SimpleLayout/NavBar';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: '100%'
		},
		toolbar: theme.mixins.toolbar
	}
});

function SimpleLayout({ children }) {
	const styles = useStyles();
	const theme = useTheme();
	const breakpoint = useMediaQuery(theme.breakpoints.up("lg"));

	const [list, setList] = useState([]);

	useEffect(() => {
		const navBarItems = getNavBarContents();
		setList(navBarItems);
	}, []);

	return (
		<Box className={styles.root}>
			<NavBar
				title='Teachify'
				items={list}
				breakpointUp={breakpoint}
			/>
			<Box className={styles.toolbar}></Box>
			<Box>
				{children}
			</Box>
		</Box >
	)
}

export default SimpleLayout;