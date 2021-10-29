import Cookies from 'js-cookie';

var expire;

const Cookie = (remember) => {
	expire = remember;
	/**Sets the key to the value */
	const set = (key, value) => {
		if (expire === true) Cookies.set(key, value, { expires: 180, sameSite: 'strict' });
		else Cookies.set(key, value, { sameSite: 'strict' });
	}

	const get = (key) => {
		return Cookies.get(key);
	}

	return { set, get }
}

export default Cookie;