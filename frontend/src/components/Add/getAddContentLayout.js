import {
	Button,
	TextField,
	Grid
} from '@mui/material';


import {
	KeyboardArrowRight
} from '@material-ui/icons';

const getAddContentLayout = (role, routename) => {
	let list = [];

	if (role == 'ADMIN') {
		if (routename === 'customers') {
			list = [
				{
					sectiontitle: 'Info',
					fields: [
						<Grid item xs={12} md={6}>
							<TextField
								label="First Name"
								type="fname"
								required
								fullWidth
								autoComplete="fname"
								autoFocus
							// value={firstName}
							// onChange={e => setFirstName(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12} md={6}>
							<TextField
								label="Last Name"
								type="lname"
								required
								fullWidth
								autoComplete="lname"
							// value={lastName}
							// onChange={e => setLastName(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12}>
							<TextField
								label="Email Address"
								type="email"
								margin="normal"
								// error={emailError ? true : false}
								// helperText={emailError}
								required
								fullWidth
								autoComplete="email"
							// value={email}
							// onChange={e => setEmail(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12}>
							<TextField
								label="Phone"
								type="phone"
								margin="normal"
								// error={emailError ? true : false}
								// helperText={emailError}
								required
								fullWidth
								autoComplete="phone"
							// value={email}
							// onChange={e => setEmail(e.target.value)}
							/>
						</Grid>
						,
						<Button
							type="submit"
							variant="contained"
							sx={{ m: 1, mt: 2, ml: 'auto', pr: '0.75' }}
						>
							Next <KeyboardArrowRight />
						</Button>
					]
				}
			];
		} else if (routename === 'employees') {
			list = [
				{
					sectiontitle: 'Info',
					fields: [
						<Grid item xs={12} md={6}>
							<TextField
								label="First Name"
								type="fname"
								required
								fullWidth
								autoComplete="fname"
								autoFocus
							// value={firstName}
							// onChange={e => setFirstName(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12} md={6}>
							<TextField
								label="Last Name"
								type="lname"
								required
								fullWidth
								autoComplete="lname"
							// value={lastName}
							// onChange={e => setLastName(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12} md={6}>
							<TextField
								label="Email Address"
								type="email"
								margin="normal"
								// error={emailError ? true : false}
								// helperText={emailError}
								required
								fullWidth
								autoComplete="email"
							// value={email}
							// onChange={e => setEmail(e.target.value)}
							/>
						</Grid>
						,
						<Grid item xs={12} md={6}>
							<TextField
								label="Title"
								type="title"
								margin="normal"
								// error={emailError ? true : false}
								// helperText={emailError}
								required
								fullWidth
								autoComplete="title"
							// value={email}
							// onChange={e => setEmail(e.target.value)}
							/>
						</Grid>
						,
						<Button
							type="submit"
							variant="contained"
							sx={{ m: 1, mt: 2, ml: 'auto', pr: '0.75' }}
						>
							Next <KeyboardArrowRight />
						</Button>
					]
				}
			];
		}
	}


	return list;
}

export default getAddContentLayout;