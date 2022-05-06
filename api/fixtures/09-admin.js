const bcrypt = require("bcryptjs");
module.exports = [
	{
		model: "Admins",
		keys: ["email", "username"],
		data: {
			username: "admin",
			firstname: "Téo",
			lastname: "Lugat",
			email: "admin@totoro.fr",
			password: bcrypt.hashSync("123456", 10),
			status: {
				label: "actived",
			},
			role: {
				label: "Administrateur",
			},
		},
	},
];
