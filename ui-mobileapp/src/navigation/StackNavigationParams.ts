export type StackParamList = HomeParamList & AuthParamList & BottomTabParamList;

export type HomeParamList = {
  Accueil: undefined;
};

export type AuthParamList = {
  "Se connecter": undefined;
  "S'inscrire": undefined;
};

export type BottomTabParamList = {
  Annonces: undefined;
  Publier: undefined;
  Messagerie: undefined;
  Profil: undefined;
};
