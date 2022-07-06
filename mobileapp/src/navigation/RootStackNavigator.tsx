import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import useAuth from "../common/contexts/AuthContext";
import Explanation from "../screens/Explanation";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Conversation from "../screens/single/Conversation";
import JobsFilter from "../screens/JobsFilter";
import Job from "../screens/single/Job";
import Scanner from "../screens/Scanner";
import Profile from "../screens/single/Profile";

import BottomTabNavigator from "./BottomTabNavigator";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ChangePassword from "../screens/auth/ChangePassword";
import Jobs from "../screens/Jobs";

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  const { user, isLoading } = useAuth();

  // TODO: Add Launching screen is `isLoading` on useAuth is true?
  if (isLoading) return null;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? "BottomTab" : "Explications"}
    >
      {!user && (
        <>
          <RootStack.Screen name="Explications" component={Explanation} />
          <RootStack.Screen name="Se connecter" component={Login} />
          <RootStack.Screen name="S'inscrire" component={Register} />

          <RootStack.Screen
            name="Mot de passe oublié"
            component={ForgotPassword}
          />
          <RootStack.Screen
            name="Changement mot de passe"
            component={ChangePassword}
          />
        </>
      )}

      {user && (
        <>
          <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />

          <RootStack.Screen name="Scanner" component={Scanner} />

          <RootStack.Screen name="Jobs" component={Jobs} />
          <RootStack.Screen name="JobsFilter" component={JobsFilter} />
          <RootStack.Screen name="Job" component={Job} />

          <RootStack.Screen name="Profile" component={Profile} />

          <RootStack.Screen name="Conversation" component={Conversation} />
        </>
      )}
    </RootStack.Navigator>
  );
}
