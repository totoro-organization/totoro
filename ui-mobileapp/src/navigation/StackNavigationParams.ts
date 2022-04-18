export type StackParamList = {
  Mission: { id: number };
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

export type BottomTabParamList = {
  BottomTab: undefined;
};
