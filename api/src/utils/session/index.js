const jwt = require("jsonwebtoken");
const JWT_SECRET = "totoro";
const { error } = require("../common/messages.json");

module.exports = {
	generateToken: function (data, isAdmin = null) {
		return jwt.sign(
			{
				data,
				isAdmin,
			},
			JWT_SECRET,
			{
				expiresIn: "168h",
			}
		);
	},
	parseAuthorization: function (authorization) {
		return authorization != null ? authorization.replace("Bearer ", "") : null;
	},
	getUser: function (authorization) {
		var user = null;
		var token = module.exports.parseAuthorization(authorization);
		if (token != null) {
			try {
				var jwtToken = jwt.verify(token, JWT_SECRET);
				if (jwtToken != null) user = jwtToken;
			} catch (err) {}
		}
		return user;
	},
	passport: function (req, res, next) {
		const authorization = req.headers["authorization"];
		const userData = module.exports.getUser(authorization);
		// console.log(userData, authorization);
		if (userData) next();
		else {
			return res
				.status(error.access_denied.status)
				.json({ message: error.access_denied.message });
		}
	},
};
