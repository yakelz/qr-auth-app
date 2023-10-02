const express = require('express');
const { toDataURL } = require('qrcode');
const config = require('./config');

const app = express();

app.get('/generate_qr', async (req, res) => {
	try {
		const session_id = Math.random().toString(36).substring(7);
		const qr_code_url = await toDataURL(session_id);
		res.json({ session_id, qr_code_url });
	} catch (error) {
		res.status(500).json({ error: 'Could not generate QR Code' });
	}
});

app.listen(config.port, config.serverIp, () => {
	console.log(`Server is running at http://${config.serverIp}:${config.port}`);
});
