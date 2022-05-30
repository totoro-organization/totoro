import type { ProfileType } from "../screens/uniques/Profile";

export type StackParamList = {
  Mission: { id: number };
  Profile: { id: number; type: ProfileType };
} & HomeParamList &
  AuthParamList &
  BottomTabParamList;

export type HomeParamList = {
  Accueil: undefined;
  Explications: undefined;
};

export type AuthParamList = {
  "Se connecter": undefined;
  "S'inscrire": undefined;
};

export type AppParamList = {
  Missions: undefined;
  Boutique: undefined;
  Profil: undefined;
  Messagerie: undefined;
};

export type BottomTabParamList = {
  BottomTab: { screen: keyof AppParamList };
};
