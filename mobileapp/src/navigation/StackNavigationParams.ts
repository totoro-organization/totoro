import type { ProfileType } from "../screens/single/Profile";

export type StackParamList = {
  Job: { id: string };
  Conversation: { id: number };
  Profile: { id: number; type: ProfileType };
} & AuthParamList &
  BottomTabParamList &
  AppParamList;

export type AuthParamList = {
  Explications: undefined;
  "Se connecter": undefined;
  "S'inscrire": undefined;
  "Mot de passe oublié": undefined;
  "Changement mot de passe": undefined;
};

export type AppParamList = {
  // TODO: Add filters param for Jobs page.
  Jobs: undefined;
  Boutique: undefined;
  Profil: undefined;
  Messagerie: undefined;
  Scanner: undefined;
  JobsFilter: undefined;
};

export type BottomTabParamList = {
  BottomTab: { screen: keyof AppParamList };
};
