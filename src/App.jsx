import CountryCard from './components/CountryCard/CountryCard';
import { useState, useEffect } from 'react';

// https://restcountries.com/v3.1/region/europe
function App() {
	const [countryData, setCountryData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/region/europe')
			.then((response) => {
				if (!response.ok)
					throw Error(response.status + ' ' + response.statusText);
				return response.json();
			})
			.then((data) => {
				setLoading(false);
				const countriesFilteredData = data.map((country) => {
					return {
						name: country.name.common,
						capital: country.capital,
						languages: country.languages,
						population: country.population,
						flag: country.flags.svg,
					};
				});
				console.log(countriesFilteredData);
				setCountryData(countriesFilteredData);
			})
			.catch((err) => {
				setError(err);
				setCountryData(null);
				setLoading(false);
			});
	}, []);

	return (
		<div className="min-h-screen bg-slate-800">
			<div className="max-w-7xl mx-auto py-20 px-4">
				<h1 className="text-gray-50 text-4xl">Europe Countries Data</h1>
				<p className="text-gray-100 text-xl mb-8">
					Click on a card to reveal a country's information
				</p>
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-xs mx-auto sm:max-w-none">
					{loading ? (
						<div>Loading...</div>
					) : error ? (
						<div>Error: {error.message}</div>
					) : (
						countryData &&
						countryData.map((country) => (
							<CountryCard
								key={country.name}
								countryData={country}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
