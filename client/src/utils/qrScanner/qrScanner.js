import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './qrScanner.css';

const QrScanner = ({ onScanSuccess, onScanError, startScanner }) => {
	const scannerRef = useRef(null);
	const [scannerActive, setScannerActive] = useState(true);

	useEffect(() => {
		const qrScanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
		scannerRef.current = qrScanner;

		return () => {
			if (scannerRef.current) scannerRef.current.clear();
		};
	}, []);

	const handleScanSuccess = async (decodedText) => {
		try {
			// Тут ваш код для обработки успешного сканирования
			onScanSuccess(decodedText);

			// Останавливаем сканер и убираем его отображение
			scannerRef.current.clear();
			setScannerActive(false);
		} catch (error) {
			console.error('Could not send the scanned code to the server', error);
		}
	};

	return (
		<div>
			{scannerActive && <div id='reader' className='qr-reader'></div>}
			{scannerActive && (
				<button
					onClick={() =>
						scannerRef.current.render(handleScanSuccess, onScanError)
					}
				>
					Start Scanner
				</button>
			)}
		</div>
	);
};

export default QrScanner;
