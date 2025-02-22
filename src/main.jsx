import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import '@/App.css';
import App from '@/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<HelmetProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</HelmetProvider>
		</BrowserRouter>
	</StrictMode>,
);
