module.exports = [
  {
    model: "Roles",
    keys: ["label"],
    data: {
      label: "Moderateur",
      type: "all",
      status: {
				label: "actived",
			},
    },
  },
  {
    model: "Roles",
    keys: ["label"],
    data: {
      label: "Administrateur",
      type: "all",
      status: {
				label: "actived",
			},
    },
  },
  {
    model: "Roles",
    keys: ["label"],
    data: {
      label: "Comptables",
      type: "admin",
      status: {
				label: "actived",
			},
    },
  },
];
