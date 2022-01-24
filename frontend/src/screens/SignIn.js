import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from '../components/Core/Cookie';
import {
	Box,
	makeStyles
} from '@material-ui/core'

const Axios = axios.create();

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			alignSelf: 'center',
			margin: '0 0 0 0',
			padding: '20px 0 0 0',
			height: '100vh',
			overflow: 'auto',
			backgroundColor: theme.palette.primary.main
		},
	}
});

const Copyright = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}

			<Link color="inherit" href="http://buildus.herokuapp.com/">
				BuildUs
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignIn = (props) => {
	const styles = useStyles();

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [remember, setRemember] = useState(false);

	const handleSubmit = async (event) => {

		let cookie = Cookies(remember);

		try {
			if (errorsExist(email)) return;

			cookie.set('remember', remember);
			event.preventDefault();

			const res = await Axios.post('/auth/signin', {
				email: email,
				password: password
			});

			if (res.data.msg === "invalidemail") {
				setEmailError('Email invalid');
				return;
			}
			if (res.data.msg === "invalidpassword") {
				setPasswordError('Password invalid');
				return;
			}

			cookie.set('id', res.data.id);
			cookie.set('accessToken', res.data.accessToken);
			cookie.set('refreshToken', res.data.refreshToken);

			if (res.data.msg === "success") {
				props.history.push(res.data.route);
			}
			else {
				setEmailError('Something went wrong. Please re-enter email');
				setPasswordError('Something went wrong. Please re-enter password');
			}
		} catch (err) {
			console.log(err);
		}
	}

	const errorsExist = (email) => {
		let error = false;
		if (!validEmail(email)) {
			setEmailError('Email address is not valid');
			error = true;
		} else {
			setEmailError('');
		}

		return error;
	}

	const validEmail = (email) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	}

	return (
		<Box className={styles.root}>
			<CssBaseline />
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							label="Email Address"
							name="email"
							type="email"
							margin="normal"
							error={emailError ? true : false}
							helperText={emailError}
							required
							fullWidth
							autoComplete="email"
							autoFocus
							value={email}
							onChange={e => {
								setEmailError('');
								setPasswordError('');
								return setEmail(e.target.value);
							}}
						/>
						<TextField
							label="Password"
							name="password"
							type="password"
							margin="normal"
							error={passwordError ? true : false}
							helperText={passwordError}
							required
							fullWidth
							autoComplete="current-password"
							value={password}
							onChange={e => {
								setEmailError('');
								setPasswordError('');
								return setPassword(e.target.value);
							}}
						/>
						<FormControlLabel
							control={<Checkbox value={remember} color="primary" onChange={e => setRemember(e.target.checked)} />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
				<Typography variant="body2" color="text.secondary" align="center" {...props}>
					Sign up and Sign in to view Demo Application in Admin mode
				</Typography>
				<Typography variant="body2" color="text.secondary" align="center" {...props}>
					Click on "Don't have an account? Sign Up" to Sign Up
				</Typography>
			</Container>
		</Box >
	);
}

export default SignIn;