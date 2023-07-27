import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import defaultMovies from '../defaultMovies';
import { fetchMovieDb } from '../movieDb';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import MovieTeasers from './MovieTeasers';
import FilterForm from './FilterForm';
import FilterStatus from './FilterStatus';

export default function SearchPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [movies, setMovies] = useState(defaultMovies);

	const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

	useMoviesSearch(debouncedSearchTerm, setMovies);

	return (
		<>
			<Helmet>
				<title>Filmdatenbank</title>
			</Helmet>
			<FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{movies !== defaultMovies && <FilterStatus count={movies.length} />}
			<MovieTeasers movies={movies} />
		</>
	);
}

function useMoviesSearch(debouncedSearchTerm, setMovies) {
	useEffect(() => {
		if (debouncedSearchTerm.length < 2) {
			setMovies(defaultMovies);
			return;
		}

		async function fetchMovies() {
			try {
				const { data } = await fetchMovieDb('/search/movie', {
					params: {
						query: debouncedSearchTerm,
					},
				});

				setMovies(data.results);
			} catch (error) {
				console.log(error);
				setMovies([]);
			}
		}
		fetchMovies();
	}, [debouncedSearchTerm]);
}

/* 
1. Nutzt den useDebouncedValue-Hook, um mit 600 Millisekunden Verzögerung
den Wert von searchTerm in eine Variable namens debouncedSearchTerm zu
speichern.
2. Nutzt fetchMovieDB, um die zu debouncedSearchTerm passenden Filme 
zu laden, debouncedSearchTerm mindestens zwei Buchstaben enthält.
Bei einem kürzeren String sollen die defaultMovies angezeigt werden.
https://developers.themoviedb.org/3/search/search-movies
3. Speichert die geladenen Filme in movies
4. Zeigt zwischen FilterForm und MovieTeasers die Komponente FilterStatus an,
aber nur dann, wenn nicht die defaultMovies angezeigt werden.

*/
