const axios = require("axios");

module.exports = axios.create({
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-type": "application/json",
	},
});
