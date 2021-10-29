import Axios from 'axios';
import Cookies from 'js-cookie';
import Cookie from './Cookie';

const refreshToken = async () => {
	console.log('new token')
	try {
		const res = await Axios.create().post('http://localhost:5000/auth/refresh', {
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

export default refreshToken;