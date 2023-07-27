import React from 'react';
import ReactDOM from 'react-dom/client';

import LocationFinder from './components/LocationFinder';
import MoviesFinder from './components/MoviesFinder';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			{/* <LocationFinder /> */}
			<MoviesFinder />
		</HelmetProvider>
	</React.StrictMode>
);
