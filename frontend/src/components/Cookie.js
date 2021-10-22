import Cookies from 'js-cookie';

var expire;

const Cookie = (remember) => {
	expire = remember == false;

	/**Sets the key to the value */
	const set = (key, value) => {
		if (expire) Cookies.set(key, value, { expires: 15, sameSite: 'strict' });
		else Cookies.set(key, value, { sameSite: 'strict' });
	}

	const get = (key) => {
		return Cookies.get(key);
	}

	return { set, get }
}

export default Cookie;