import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Chat from "../screens/Chat";
import Posts from "../screens/Posts";
import Profile from "../screens/Profile";
import Publish from "../screens/Publish";

const NAVIGATION_PAGES = [
  {
    title: "Annonces",
    component: Posts,
    icon: "post",
  },
  {
    title: "Publier",
    component: Publish,
    icon: "publish",
  },
  {
    title: "Messagerie",
    component: Chat,
    icon: "chat",
  },
  {
    title: "Profil",
    component: Profile,
    icon: "user",
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_PAGES[0].title}
      screenOptions={{
        headerShown: false,
      }}
    >
      {NAVIGATION_PAGES.map(({ title, component }) => (
        <Tab.Screen
          key={title}
          name={title}
          component={component}
          // TODO: create Icon component and add tab icon
          // options={{ tabBarIcon: <Icon name={icon} />}}
        />
      ))}
    </Tab.Navigator>
  );
}
