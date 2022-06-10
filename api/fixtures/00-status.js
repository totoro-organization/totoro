module.exports = [
  {
    model: "Status",
    data: {
      label: "actived",
      type: "['admins', 'users', 'partners', 'jobs', 'groups', 'associations', 'commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "disabled",
      type: "['admins', 'users', 'partners', 'jobs', 'groups', 'associations', 'commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "deleted",
      type: "['admins', 'users', 'partners', 'jobs', 'groups', 'associations', 'commons']",
    },
  },
  {
    model: "Status",
    data: {
      label: "accepted",
      type: "['parterns','jobs','groups','associations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "denied",
      type: "['admins','users', 'partners','associations','groups']",
    },
  },
  {
    model: "Status",
    data: {
      label: "published",
      type: "['jobs', 'discounts']",
    },
  },
  {
    model: "Status",
    data: {
      label: "expired",
      type: "['partners', 'discounts', 'subscriptions', 'litigations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "opened",
      type: "['litigations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "closed",
      type: "['litigations','jobs','groups']",
    },
  },
  {
    model: "Status",
    data: {
      label: "freezed",
      type: "['users', 'admins', 'partners', 'associations']",
    },
  },
  {
    model: "Status",
    data: {
      label: "canceled",
      type: "['jobs']",
    },
  },
  {
    model: "Status",
    data: {
      label: "pending",
      type: "['partners']",
    },
  },
  {
    model: "Status",
    data: {
      label: "coming",
      type: "['jobs']",
    },
  },
];
