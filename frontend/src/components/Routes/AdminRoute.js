import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from '../Core/Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'

const Axios = axios.create();
Authentication.setAuthentication(Axios);

const AdminRoute = ({ component: Component, ...rest }) => {
	const [role, setRole] = useState('');

	useEffect(() => {
		const getRole = async () => {
			try {
				const id = Cookies.get('id');
				if (!id) return;

				const res = await Axios.get('/users/' + id,
					{
						params: { id: id }
					}
				)
				const role = res.data.role;
				setRole(() => (role));
			} catch (err) {
				console.log(err);
			}
		}

		getRole();
	}, [])

	return (
		<Route
			{...rest}
			render={props => {
				const authenticated = Authentication.isAuthenticated();
				if (authenticated === true) {
					if (role === 'A') {
						return <Component {...props} />
					} else {
						return role && <Redirect
							to={{
								pathname: "/unauthorized",
								state: { from: props.location }
							}}
						/>
					}
				} else {
					return <Redirect
						to={{
							pathname: "/signin",
							state: { from: props.location }
						}}
					/>
				}
			}}
		/>
	)
}

export default AdminRoute;