import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QrScanner from './utils/qrScanner/qrScanner';
import { API_BASE_URL } from './config';

function App() {
	const [qrCode, setQrCode] = useState(null);
	const [status, setStatus] = useState('Awaiting Scan');

	useEffect(() => {
		const generateQrCode = async () => {
			try {
				const { data } = await axios.get(`${API_BASE_URL}/generate_qr`);
				setQrCode(data.qr_code_url);
			} catch (error) {
				console.error('Could not generate QR Code', error);
			}
		};
		generateQrCode();
	}, []);

	const onScanSuccess = (decodedText) => {
		setStatus(`QR Code has been scanned successfully! ${decodedText}`);
	};

	const onScanError = (error) => {
		console.error(error);
		setStatus('Failed to scan QR Code!');
	};

	const startScanner = (scannerRef, onScanSuccess, onScanError) => () => {
		if (scannerRef.current)
			scannerRef.current.render(onScanSuccess, onScanError);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>QR Code Authentication</h1>
				{qrCode && <img src={qrCode} alt='QR Code' />}
				<QrScanner
					onScanSuccess={onScanSuccess}
					onScanError={onScanError}
					startScanner={startScanner}
				/>
				<p>{status}</p>
			</header>
		</div>
	);
}

export default App;
