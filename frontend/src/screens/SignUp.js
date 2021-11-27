import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Axios = axios.create();

const Copyright = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const SignUp = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();

			if (errorsExist(email, password)) return;

			await Axios.post('/auth/signup', {
				email: email,
				password: password,
				firstname: firstName,
				lastname: lastName,
				role: 'A'
			});

			props.history.push('/signin');
		} catch (err) {
			console.log(err);
		}
	};

	const errorsExist = (email, password) => {
		var error = false;
		if (!validEmail(email)) {
			setEmailError('Email address is not a valid email address');
			error = true;
		} else {
			setEmailError('');
		}

		if (!validPassword(password)) {
			setPasswordError('Password must be more than 3 characters, at least one number, one lower case and one upper case character');
			error = true;
		} else {
			setPasswordError('');
		}

		return error;
	}

	const validEmail = (email) => {
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	}

	const validPassword = (password) => {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/.test(password);
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				alignSelf: 'center',
				margin: '0 0 0 0',
				padding: '20px 0 0 0',
				height: '100vh',
				overflow: 'auto'
			}}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
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
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									label="First Name"
									type="fname"
									required
									fullWidth
									autoComplete="fname"
									autoFocus
									value={firstName}
									onChange={e => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									label="Last Name"
									type="lname"
									required
									fullWidth
									autoComplete="lname"
									value={lastName}
									onChange={e => setLastName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Email Address"
									type="email"
									margin="normal"
									error={emailError ? true : false}
									helperText={emailError}
									required
									fullWidth
									autoComplete="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									label="Password"
									type="password"
									margin="normal"
									error={passwordError ? true : false}
									helperText={passwordError}
									required
									fullWidth
									autoComplete="current-password"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</Box>
	);
}

export default SignUp;