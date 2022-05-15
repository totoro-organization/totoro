import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Explanation from "../screens/Explanation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Mission from "../screens/uniques/Mission";
import Profile from "../screens/uniques/Profile";
import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  // NOTE: Add isLogged with AuthProvider? AuthContext? etc.
  const isLogged = true;

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Accueil"
    >
      {!isLogged && (
        <>
          <RootStack.Screen name="Explications" component={Explanation} />
          <RootStack.Screen name="Se connecter" component={Login} />
          <RootStack.Screen name="S'inscrire" component={Register} />
        </>
      )}

      {isLogged && (
        <>
          <RootStack.Group>
            <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />
          </RootStack.Group>

          <RootStack.Screen name="Mission" component={Mission} />
          <RootStack.Screen name="Profile" component={Profile} />
        </>
      )}
    </RootStack.Navigator>
  );
}
