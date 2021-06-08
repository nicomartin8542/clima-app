import axios from "axios";

export const consultApi = async (search) => {
	const {place, country} = search;
	const apikey = "57f220caf42bfc13e56f2c445fd7dd3b";
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${place},${country}&appid=${apikey}`;

	if (place.trim() === "" || country.trim() === "") {
		return;
	}

	try {
		const resp = await axios.get(url);
		const result = await resp.data;
		return result.json();
	} catch (error) {
		return error;
	}
};
