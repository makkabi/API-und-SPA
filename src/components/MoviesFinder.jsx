import { Route, Link } from 'wouter';
import { lazy, Suspense } from 'react';
import SearchPage from './SearchPage';
/* Größere Komponenten, die nicht sofort (also z.B. erst nach
  einer potentiellen User-Aktion) angezeigt werden, können
  mit der lazy-Funktion von React erst bei Verwendung importiert
  werden. Vite (und ähnliche Tools) erzeugen dann eine eigene
  Datei für diese Komponente, die nur bei Bedarf geladen wird
  ("Code Splitting"). Damit kann man die Datenmenge reduzieren,
  die für die erste Darstellung der Anwendung geladen werden muss.
  Lohnt sich nur für größere Komponenten, die beispielsweise eine
  schwere Bibliothek nutzen, z.B. Leaflet für die Anzeige einer
  Landkarte. 
  https://react.dev/reference/react/lazy
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
  */
const ContactPage = lazy(() => import('./ContactPage'));
import Movie from './Movie';
import { BallTriangle } from 'react-loader-spinner';

export default function MoviesFinder() {
	return (
		<div className="movies-finder">
			<nav className="main-navigation">
				<Link to="/">Start</Link>
				<Link to="/kontakt">Kontakt</Link>
			</nav>
			<Route path="/" component={SearchPage} />
			{/* Lazy importierte Komponenten müssen in eine Suspense-Komponente
        gepackt werden, die als fallback-Prop eine Komponente benötigt,
        die während der Ladezeit von ContactPage angezeigt wird. */}
			<Suspense fallback={<BallTriangle />}>
				<Route path="/kontakt" component={ContactPage} />
			</Suspense>
			<Route path="/movie/:id" component={Movie} />
		</div>
	);
}
