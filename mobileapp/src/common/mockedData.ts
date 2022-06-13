// TODO: REMOVE THIS FILE!!

import { Association } from "../models/association";

export const FAKE_ASSOCIATIONS_DATA: Association[] = [
  {
    id: "00d2cc55-1395-428f-9a8f-0225278b76a7",
    status_id: "52a7d620-7615-4512-984c-0973ee9b8b68",
    siren: "775664410",
    siret: "77566441000013",
    name: "VOIR ENSEMBLE",
    email: "null",
    longitude: 2.31909,
    latitude: 48.8466,
    creation_date: "",
    activity: "Action sociale sans hébergement n.c.a.",
    address: "15 RUE MAYET",
    description: "null",
    link: "http://www.voirensemble.asso.fr/",
    phone: "0142199275",
    createdAt: new Date("2022-05-31 14:43:27"),
    updatedAt: new Date("2022-05-31 14:43:27"),

    // TO REMOVE
    cp: "75006",
    commune: "PARIS 6E ARRONDISSEMENT",
  },
  {
    id: "id bidon",
    status_id: "52a7d620-7615-4512-984c-0973ee9b8b68",
    siren: "775664410",
    siret: "77566441000013",
    name: "VOIR ENSEMBLE",
    email: "null",
    longitude: 2.31909,
    latitude: 48.8466,
    creation_date: "",
    activity: "Action sociale sans hébergement n.c.a.",
    address: "15 RUE MAYET",
    description: "null",
    link: "http://www.voirensemble.asso.fr/",
    phone: "0142199275",
    createdAt: new Date("2022-05-31 14:43:27"),
    updatedAt: new Date("2022-05-31 14:43:27"),

    // TO REMOVE
    cp: "75006",
    commune: "PARIS 6E ARRONDISSEMENT",
  },
];

// TODO: Replace me to the real data with api.
// NOTE: The data schema isn't correct.
export const FAKE_MISSIONS_DATA = [
  {
    id: 0,
    organization: {
      name: "Les restau du coeur",
      id: "00d2cc55-1395-428f-9a8f-0225278b76a7",
    },
    logo: "https://ongconseil.com/php/wp-content/uploads/2015/12/LogoRestos.jpg",
    title: "Collecte alimentaire",
    location: "Montreuil",
    description:
      "Faucibus lacus mi sed blandit id vivamus tortor sit est. Ac tempor, lectus nisi libero pretium eget elit. Tellus est tellus proin ornare viverra. Euismod et at venenatis turpis. Risus, ultrices amet et ante euismod ultrices turpis vel aliquet. Lacinia vestibulum ac, condimentum sit vestibulum, curabitur euismod. Aliquam porttitor sed pellentesque nulla. Egestas amet risus neque laoreet sollicitudin aliquam ultricies. Urna vehicula viverra varius sit.",
    tokens: 15,
    banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    tags: ["Solidarité et santé"],
    interestedParticipants: 12,
  },
  {
    id: 1,
    organization: { name: "Solid’elles", id: "342" },
    logo: "https://solidelles.com/wp-content/uploads/2021/10/logovf-02.png",
    title: "Collecte de dons pour des femmes en situation de précarité",
    location: "Paris 12",
    description: "Faucibus lacus mi sed blandit id vivamus tortor sit est.",
    tokens: 15,
    banner: "https://images.unsplash.com/photo-1541802645635-11f2286a7482",
    tags: ["Solidarité et santé"],
    interestedParticipants: 43,
  },
];

// NOTE: The data schema isn't correct.
export const FAKE_MESSAGES_DATA = [
  {
    id: 0,
    mission: FAKE_MISSIONS_DATA[0],
    messages: [
      {
        user: { username: "JackD" },
        text: "ouais je serais là",
        createdAt: new Date(),
      },
      {
        user: { username: "MarieP", isOrganizateur: true },
        text: "pas de soucis",
        createdAt: new Date(),
      },
      {
        user: { username: "RogerL" },
        text: "d'acc!",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: 1,
    mission: FAKE_MISSIONS_DATA[1],
    messages: [
      {
        user: { username: "JosephW", isOrganizateur: true },
        text: "La mission se deroulera à 14h pour ceux qui seront présents sur place.",
        createdAt: new Date(),
      },
      {
        user: { username: "PloucO" },
        text: "djsqlkhdkqjdqslk dqjksdh k dqhjkhdjk sqh dqshkdshkjmdhqkls",
        createdAt: new Date(),
      },
      {
        user: { username: "MaeS" },
        text: "oki",
        createdAt: new Date(),
      },
    ],
  },
];
