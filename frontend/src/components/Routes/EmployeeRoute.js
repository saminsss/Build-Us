import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from '../Core/Authentication';
import { Route, Redirect } from 'react-router';
import Cookies from 'js-cookie'

const EmployeeRoute = ({ component: Component, ...rest }) => {
	const [id, setId] = useState();
	const [role, setRole] = useState();

	useEffect(() => {
		getRole();
	}, []);

	const getRole = async () => {
		const Axios = axios.create();
		Authentication.setAuthentication(Axios);

		const id = Cookies.get('id');
		const res = await Axios.get('/api/users/' + id,
			{
				params: { id: id }
			}
		)
		setId(() => (id));
		const role = res.data[0]?.role;
		setRole(() => (role));
	};

	return (
		<Route
			{...rest}
			render={props => {
				const authenticated = Authentication.isAuthenticated();
				if (authenticated === true) {
					//if user is either admin or employee then continue to component
					if (role === 'A' || role === 'E') {
						const Axios = axios.create();
						Authentication.setAuthentication(Axios);
						return <Component {...rest} id={id} role={role} axios={Axios} />
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

export default EmployeeRoute;