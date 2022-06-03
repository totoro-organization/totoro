import type { ProfileType } from "../screens/uniques/Profile";

export type StackParamList = {
  Mission: { id: number };
  Profile: { id: number; type: ProfileType };
} & AuthParamList &
  BottomTabParamList;

export type AuthParamList = {
  Explications: undefined;
  "Se connecter": undefined;
  "S'inscrire": undefined;
};

export type AppParamList = {
  Missions: undefined;
  Boutique: undefined;
  Profil: undefined;
  Messagerie: undefined;
  Scanner: undefined;
};

export type BottomTabParamList = {
  BottomTab: { screen: keyof AppParamList };
};
