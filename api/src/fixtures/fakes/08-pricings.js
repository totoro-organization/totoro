module.exports = [
	{
		model: "Pricings",
		keys: ["label"],
		data: {
			label: "Standard",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			price: 0,
			duration: 0,
			nb_account: 3,
			nb_jobs_by_month: 5,
			nb_attachments_by_publish: 3,
			social_publish: 0,
			flux_activities: 0,
			certifate: 0,
			status: {
				label: "actived",
			},
		},
	},
	{
		model: "Pricings",
		keys: ["label"],
		data: {
			label: "Pro",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			price: 0,
			duration: 1,
			nb_attachments_by_publish: 12,
			social_publish: 1,
			flux_activities: 1,
			certifate: 1,
			status: {
				label: "actived",
			},
		},
	},
];
