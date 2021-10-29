import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Authentication from '../Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'

Authentication.setAuthentication(Axios);

let mount = false;
const AdminRoute = ({ component: Component, ...rest }) => {
	const [role, setRole] = useState('');

	useEffect(() => {
		let source = Axios.CancelToken.source();

		const getRole = async () => {
			try {
				const res = await Axios.get('http://localhost:5000/users/' + Cookies.get('id'), { cancelToken: source.token, params: { id: Cookies.get('id') } })
				const role = res.data.role;
				setRole(() => (role));
			} catch (err) {
				console.log(err);
			}
		}

		getRole();

		return () => {
			source.cancel();
		}
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
						if (mount === false) mount = true
						else return <Redirect
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