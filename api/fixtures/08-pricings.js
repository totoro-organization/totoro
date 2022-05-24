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
      nb_ads_by_month: 5,
      status: {
        label: "actived",
      },
    },
  },
  {
    model: "Pricings",
    keys: ["label"],
    data: {
      label: "Premium",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      price: 0,
      duration: 1,
      nb_account: 15,
      nb_ads_by_month: 50,
      status: {
        label: "actived",
      },
    },
  },
];
