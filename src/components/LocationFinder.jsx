import { useEffect, useState } from 'react';
import axios from 'redaxios';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function LocationFinder() {
	const [search, setSearch] = useState('');

	const [locations, setLocations] = useState([]);

	const debouncedSearch = useDebouncedValue(search, 600);

	useEffect(() => {
		if (debouncedSearch.length < 2) {
			setLocations([]);
			return;
		}

		async function fetchLocations() {
			try {
				const { data } = await axios('http://localhost:8000', {
					params: { search: debouncedSearch },
				});

				setLocations(data);
			} catch (error) {
				setLocations([]);
				console.log(error);
			}
		}

		fetchLocations();
	}, [debouncedSearch]);

	return (
		<div>
			<label htmlFor="search">PLZ oder Ortsname</label>
			<input
				id="search"
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<ul>
				{locations.map(({ place, latitude, longitude, zipcode }) => (
					/* Langer zusammengesetzter key, da Ort und PLZ nicht einmalig im Datensatz sind */
					<li key={`${zipcode}${place}${latitude}`}>
						<a
							href={`https://www.openstreetmap.org/#map=14/${latitude}/${longitude}`}
						>
							{zipcode} {place}
						</a>
					</li>
				))}
			</ul>
			{/* Stellt innerhalb von ul den Inhalt von locations dar, für jeden Eintrag
ein li-Element, das einen Link enthält. Link-Text ist Name und Postleitzahl,
Linkziel ist https://www.openstreetmap.org/#map=14/latitude/longitude,
latitude und longitude dabei mit den Werten aus der Datenbank ersetzen.
Beispiel: <li><a href="https://www.openstreetmap.org/#map=14/123/456">Ortsname</a></li>
*/}
		</div>
	);
}
