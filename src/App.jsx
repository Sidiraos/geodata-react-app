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
						<button
							type="button"
							className="bg-indigo-500 text-white ..."
							disabled
						>
							<svg
								className="animate-spin h-5 w-5 mr-3 bg-white"
								viewBox="0 0 24 24"
							></svg>
							Loading Data...
						</button>
					) : error ? (
						<button
							type="button"
							className="bg-red-500 text-white py-5 text-2xl rounded-lg flex justify-center items-center"
							disabled
						>
							<svg
								className="animate-spin h-5 w-5 mr-3 bg-white"
								viewBox="0 0 24 24"
							></svg>
							Error: {error.message}
						</button>
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
