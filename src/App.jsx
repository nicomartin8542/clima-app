import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Spinner from "./components/Spinner";

const App = () => {
	const [search, addSearch] = useState({
		place: "",
		country: "",
	});

	const [consult, addConsult] = useState(false);
	const [error, addError] = useState(false);
	const [chargeSpinner, addSpinner] = useState(false);
	const [resultApi, addResult] = useState({});

	const {place, country} = search;

	useEffect(() => {
		if (consult) {
			const consultApi = async (place, country) => {
				addSpinner(true);
				const apikey = "57f220caf42bfc13e56f2c445fd7dd3b";
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${place},${country}&appid=${apikey}`;
				try {
					const resp = await axios.get(url);
					const result = await resp.data;
					addResult(result);
					addConsult(false);
					addError(false);
					addSpinner(false);
				} catch (error) {
					addResult({
						error: "Place not found",
						cod: 404,
					});
					addError(true);
					addConsult(false);
					addSpinner(false);
				}
			};

			consultApi(place, country);
			addSearch({
				place: "",
				country: "",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [consult]);

	let component;

	if (!chargeSpinner) {
		if (!error) {
			component = <Clima resultApi={resultApi} />;
		} else {
			component = <Error mensaje="Place not found" />;
		}
	} else {
		component = <Spinner />;
	}

	return (
		<Fragment>
			<Header titulo="Clima React App" />

			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6 s12">
							<Formulario
								search={search}
								addSearch={addSearch}
								addConsult={addConsult}
							/>
						</div>
						<div className="col m6 s12">{component}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default App;
