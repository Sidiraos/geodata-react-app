import './CountryModal.css';
import { useRef, useEffect } from 'react';

const CountryModal = ({
	name,
	capital,
	languages,
	population,
	onClose,
	isOpenModal,
}) => {
	const modalRef = useRef(null);
	useEffect(() => {
		const intervalId = setTimeout(
			() => modalRef.current.classList.add('active'),
			200
		);

		return () => {
			clearInterval(intervalId);
		};
	}, []);
	return (
		<div
			className="modal bg-slate-900 bg-opacity-70 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center"
			onClick={onClose}
		>
			<div
				ref={modalRef}
				className={`bg-stone-100 rounded-sm shadow-sm px-8 py-10 relative opacity-100 w-10/12 min-h-48 max-w-2xl modalCard`}
			>
				<h4 className="text-xl mb-3">Here is {name}'s information</h4>
				<p className="mb-2">
					<b>Capital : </b>
					{capital}
				</p>
				<p className="mb-2">
					<b>Language(s)</b> : {languages}
				</p>
				<p>
					<b>Population</b> : {population}
				</p>
				<button
					className="text-white bg-red-600 rounded-md shadow-md px-3 py-1 absolute top-1 right-1 flex justify-center items-center font-bold"
					onClick={onClose}
				>
					x
				</button>
			</div>
		</div>
	);
};
export default CountryModal;
