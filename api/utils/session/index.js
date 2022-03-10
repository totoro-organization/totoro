const jwt = require("jsonwebtoken");
const JWT_SECRET = "totoro";

module.exports = {
	generateToken: function (data, isAdmin = null) {
		return jwt.sign(
			{
				data,
				isAdmin,
			},
			JWT_SIGN_SECRET,
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
				var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
				if (jwtToken != null) user = jwtToken;
			} catch (err) {}
		}
		return user;
	},
};
