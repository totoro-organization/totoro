const bcrypt = require("bcryptjs");
module.exports = [
  {
    model: "Users",
    keys: ["email", "username"],
    data: {
      username: "j2frise",
      firstname: "Jarce",
      lastname: "Boukoro",
      email: "jarce2frise@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      total_token: 0,
      phone: "0751932695",
      bio: "Je ne suis pas sympa",
      birthday: "1991-10-08",
      longitude: 2.437956,
      avatar: "avatar/avatar.svg",
      latitude: 48.8267951,
      status: {
        label: "actived",
      },
    },
  },
  {
    model: "Users",
    keys: ["email", "username"],
    data: {
      username: "percam",
      firstname: "Camille",
      lastname: "Perianez",
      email: "percam31@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      total_token: 0,
      phone: "0751932695",
      bio: "Je suis très sympa",
      birthday: "1990-07-04",
      longitude: 2.437956,
      avatar: "/avatar/avatar.svg",
      latitude: 48.8267951,
      status: {
        label: "actived",
      },
    },
  },
];
