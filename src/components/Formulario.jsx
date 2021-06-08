import React, {useState} from "react";
import PropTypes from "prop-types";
import Error from "./Error";
const Formulario = ({search, addSearch, addConsult}) => {
	//State Form
	const [error, addError] = useState(false);
	const {place, country} = search;

	//Add values form
	const handleChange = (e) => {
		addSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		//Valid form
		if (place.trim() === "" || country.trim() === "") {
			addError(true);
			return;
		}

		//Add props compmente principal
		addSearch({
			place,
			country,
		});
		addError(false);
		addConsult(true);
		e.target.reset();
	};

	return (
		<form onSubmit={handleSubmit}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

			<div className="input-field col s12">
				<input
					type="text"
					name="place"
					id="place"
					value={place}
					onChange={handleChange}
				/>
				<label htmlFor="ciudad">Ciudad:</label>
			</div>
			<div className="input-field col s12">
				<select
					name="country"
					id="country"
					value={country}
					onChange={handleChange}
				>
					<option value="">-- Seleccione un pais--</option>
					<option value="US">Estados Unidos</option>
					<option value="MX">México</option>
					<option value="AR">Argentina</option>
					<option value="CO">Colombia</option>
					<option value="CR">Costa Rica</option>
					<option value="ES">España</option>
					<option value="PE">Perú</option>
				</select>
				<label htmlFor="country">Pais:</label>
			</div>

			<div className="input-field col s12">
				<button
					type="submit"
					className="waves-effect waves-light btn-large btn green accent-5"
				>
					Buscar Clima
				</button>
			</div>
		</form>
	);
};

Formulario.prototype = {
	search: PropTypes.object.isRequired,
	addSearch: PropTypes.func.isRequired,
	addConsult: PropTypes.func.isRequired,
};

export default Formulario;
