import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Explanation from "../screens/Explanation";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Mission from "../screens/uniques/Mission";
import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  // NOTE: Add isLogged with AuthProvider? AuthContext? etc.
  const isLogged = false;

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
        </>
      )}
    </RootStack.Navigator>
  );
}
