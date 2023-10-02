require('dotenv').config();

const config = {
	port: process.env.PORT || 3001,
	serverIp: process.env.SERVER_IP || '127.0.0.1',
};

module.exports = config;
