import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
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
      <RootStack.Screen name="Se connecter" component={SignIn} />
      <RootStack.Screen name="S'inscrire" component={SignUp} />

      <RootStack.Group>
        <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
