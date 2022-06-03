import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import useAuth from "../common/contexts/AuthContext";

import Explanation from "../screens/Explanation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Mission from "../screens/uniques/Mission";
import Scanner from "../screens/Scanner";
import Profile from "../screens/uniques/Profile";

import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator();

// TODO: Add Launching screen is `isLoading` on useAuth is true?
export default function RootStackNavigator() {
  const { user } = useAuth();

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
        </>
      )}

      {user && (
        <>
          <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />

          <RootStack.Screen name="Scanner" component={Scanner} />
          <RootStack.Screen name="Mission" component={Mission} />
          <RootStack.Screen name="Profile" component={Profile} />
        </>
      )}
    </RootStack.Navigator>
  );
}
