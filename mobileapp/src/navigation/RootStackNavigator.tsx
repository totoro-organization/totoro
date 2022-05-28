import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import useAuth from "../common/contexts/AuthContext";
import Explanation from "../screens/Explanation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Mission from "../screens/uniques/Mission";
import Profile from "../screens/uniques/Profile";
import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  const { user } = useAuth();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? "BottomTab" : "Explications"}
    >
      <RootStack.Screen name="Explications" component={Explanation} />
      <RootStack.Screen name="Se connecter" component={Login} />
      <RootStack.Screen name="S'inscrire" component={Register} />

      <RootStack.Screen name="BottomTab" component={BottomTabNavigator} />

      <RootStack.Screen name="Mission" component={Mission} />
      <RootStack.Screen name="Profile" component={Profile} />
    </RootStack.Navigator>
  );
}
