import Cookies from "js-cookie";
import Cookie from './Cookie';
import Decode from 'jwt-decode';
import Axios from "axios";

const Authentication = () => {

	/**
	 * Checks to see if the webapp is authenticated by looking at the values stored in cookies
	 * and sending a backend request to verify JWT authorization token
	 * @requires cookie with key id - holds the user id
	 * @requires cookie with key accessToken - holds the JWT authorization token
	 * @requires cookie with key refreshToken - holds the JWT refresh token
	 * @requires cookie with key remember - holds whether user should be remembered
	 * @returns 
	 */
	const isAuthenticated = async () => {
		let isAuthenticated = false;

		const id = Cookies.get('id');
		const accessToken = Cookies.get('accessToken');
		const refreshToken = Cookies.get('refreshToken');
		const remember = Cookies.get('remember');
		if (id && accessToken && refreshToken && remember) {
			const authReq = Axios.create();
			setAuthentication(authReq);

			const res = await authReq.post(`/auth/verify/${id}`);
			if (res.data.msg === 'success') isAuthenticated = true;
		}

		return isAuthenticated;
	}

	/**
	 * Refreshes the access token after it expires by using the refresh token
	 * @returns 
	 */
	const refreshToken = async () => {
		console.log('new token')
		try {
			const res = await Axios.create().post('/auth/refresh', {
				token: Cookies.get('refreshToken')
			});

			const remember = Cookies.get('remember') === 'true';
			const cookie = Cookie(remember);
			cookie.set('accessToken', res.data.accessToken);
			cookie.set('refreshToken', res.data.refreshToken);

			return res.data;
		} catch (error) {
			console.log(error);
		}
	};


	/** 
	 * Sets the interceptor for the Axios object to include the JWT in the header for all its requests
	 * @param Axios - The Axios object to set the header for
	*/
	const setAuthentication = (Axios) => {
		Axios.interceptors.request.use(async (config) => {
			let currentDate = new Date();

			const accessToken = Cookies.get('accessToken');
			if (!accessToken) return config;

			const decodedToken = Decode(accessToken);
			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				const data = await refreshToken();
				config.headers.authorization = "Bearer " + data.accessToken;
			} else {
				config.headers.authorization = "Bearer " + Cookies.get('accessToken');
			}
			return config;
		}, (error) => (Promise.reject(error)));
	}

	return { isAuthenticated, setAuthentication };
}

Authentication().setAuthentication(Axios);

export default Authentication();