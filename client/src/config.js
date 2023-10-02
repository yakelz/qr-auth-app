let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
	API_BASE_URL = 'http://localhost:3001';
} else {
	API_BASE_URL = 'https://yakelz.ru/api';
}

export { API_BASE_URL };
