module.exports = [
  {
    model: "Discounts",
    keys: ["name"],
    data: {
      name: "40",
      type: {
        label: "Pourcentage",
      },
      partner: {
        name: "Le Moulin de la Croix Nivert",
      },
      description: "Profitez de -40% sur le pain et toutes les viennoiseries",
      condition: "Pas de montant minimum d'achat",
      duration: 80,
      cost: 30,
      status: {
        label: "actived",
      },
    },
  },
];
