import { createPortal } from 'react-dom';
import CountryModal from '../CountryModal/CountryModal';
import { useState } from 'react';

const CountryCard = (props) => {
	const { name, capital, languages, population, flag , alt , maps } = props.countryData;
	// console.log(props.countryData);
	const languageStr = Object.values(languages).join(', ');
	// console.log(languageStr);
	const capitalStr = capital.join(', ');
	// console.log(capitalStr);

	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div
				className="relative hover:scale-y-110 transition-transform duration-100 ease-in cursor-pointer will-change-transform"
				onClick={() => setShowModal(true)}
			>
				<img src={flag} alt={alt} className='object-cover h-[200px] w-full'/>
				<p className="absolute left-0 top-0 z-10 border-1 border-black border-solid bg-slate-50 hover:bg-slate-200 px-3 py-2 text-center cursor-pointer drop-shadow-lg rounded-sm">
					{name}
				</p>
			</div>
			{showModal &&
					createPortal(
						<CountryModal
							name={name}
							capital={capitalStr}
							languages={languageStr}
							population={population}
							onClose={() => setShowModal(false)}
							isOpenModal = {showModal}
							maps = {maps}
						/>,
						document.getElementById('modal-root')
					)}
		</>
	);
};
export default CountryCard;
