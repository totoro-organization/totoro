module.exports = [
  {
    model: "Status",
    data: {
      label: "actived",
      type: "['Admins', 'Users', 'Partners', 'Jobs', 'Groups', 'Associations', 'Commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "disabled",
      type: "['Admins', 'Users', 'Partners', 'Jobs', 'Groups', 'Associations', 'Commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "deleted",
      type: "['Admins', 'Users', 'Partners', 'Jobs', 'Groups', 'Associations', 'Commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "accepted",
      type: "['Partners','Jobs','Groups','Associations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "denied",
      type: "['Admins','Users', 'Partners','Associations','Groups']",
    },
  },
  {
    model: "Status",
    data: {
      label: "published",
      type: "['Jobs', 'Discounts']",
    },
  },
  {
    model: "Status",
    data: {
      label: "expired",
      type: "['Partners', 'Discounts', 'Subscriptions', 'Litigations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "opened",
      type: "['Litigations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "closed",
      type: "['Litigations','Jobs','Groups']",
    },
  },
  {
    model: "Status",
    data: {
      label: "freezed",
      type: "['Users', 'Admins', 'Partners', 'Associations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "canceled",
      type: "['Jobs']",
    },
  },
  {
    model: "Status",
    data: {
      label: "pending",
      type: "['Partners']",
    },
  },
  {
    model: "Status",
    data: {
      label: "coming",
      type: "['Jobs']",
    },
  },
  {
    model: "Status",
    data: {
      label: "requested",
      type: "['Associations_users', 'Associations', 'Partners']",
    },
  },
  {
    model: "Status",
    data: {
      label: "invited",
      type: "['Associations_users']",
    },
  },
  
];
