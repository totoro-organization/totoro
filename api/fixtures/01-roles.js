module.exports = [
  {
    model: "Roles",
    keys: ["label"],
    data: {
      label: "Moderateur",
      type: "['user','admin']",
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
      type: "['user','admin']",
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
      type: "['admin']",
      status: {
				label: "actived",
			},
    },
  },
];
