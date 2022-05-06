module.exports = [
	{
		model: "Ads",
		keys: ["title"],
		data: {
			title: "Tournoi de football 14-18 ans",
			participants_max: 20,
			address: "107 rue de la Croix Nivert",
			cp: 75015,
			commune: "Paris",
			description: "Tournoi de football 14-18 ans",
			start_date: "2022-05-06",
			end_date: "2022-05-06",
			difficulty: {
				level: 1,
			},
			author: {
				user: {
					username: "percam",
				},
				organization: {
					siren: "775664410",
				},
			},
			status: {
				label: "active",
			},
		},
	},
];
