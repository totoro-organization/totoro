import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Accueil"
    >
      <RootStack.Screen name="Accueil" component={Home} />
      <RootStack.Screen name="Se connecter" component={Login} />
      <RootStack.Screen name="S'inscrire" component={Register} />

      <RootStack.Group>
        <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
