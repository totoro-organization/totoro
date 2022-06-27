module.exports = [
  {
    model: "Roles",
    keys: ["label"],
    data: {
      label: "Moderateur",
      type: "['Users','Admins']",
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
      type: "['Users','Admins']",
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
      type: "['Admins']",
      status: {
				label: "actived",
			},
    },
  },
];
