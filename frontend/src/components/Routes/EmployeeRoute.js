import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from '../Core/Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'

const Axios = axios.create();
Axios.CancelToken = axios.CancelToken;
Axios.isCancel = axios.isCancel;
Authentication.setAuthentication(Axios);

let mount = false;
const EmployeeRoute = ({ component: Component, ...rest }) => {
	const [role, setRole] = useState('');

	useEffect(() => {
		let source = Axios.CancelToken.source();

		const getRole = async () => {
			try {
				const id = Cookies.get('id');
				if (!id) return;

				const res = await Axios.get('http://localhost:5000/users/' + id, { cancelToken: source.token, params: { id: id } })
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
					if (role === 'A' || role === 'E') {
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

export default EmployeeRoute;