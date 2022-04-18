import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon, { IconName } from "../components/atoms/Icon";
import { Text } from "../components/atoms/Text";
import Chat from "../screens/Chat";
import Missions from "../screens/Missions";
import Profile from "../screens/Profile";
import Shop from "../screens/Shop";

export type NavigationPagesProps = {
  title: string;
  component: () => JSX.Element;
  icon: keyof typeof IconName;
};

const NAVIGATION_PAGES: NavigationPagesProps[] = [
  {
    title: "Missions",
    component: Missions,
    icon: "missions",
  },
  {
    title: "Boutique",
    component: Shop,
    icon: "shop",
  },
  {
    title: "Messagerie",
    component: Chat,
    icon: "message",
  },
  {
    title: "Profil",
    component: Profile,
    icon: "user",
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const activeColor = (focused: boolean) => (focused ? "black" : "grey");

  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_PAGES[0].title}
      screenOptions={{
        headerShown: false,
      }}
    >
      {NAVIGATION_PAGES.map(({ title, component, icon }) => (
        <Tab.Screen
          key={title}
          name={title}
          component={component}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text size="sm" color={activeColor(focused)}>
                {title}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon name={icon} color={activeColor(focused)} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
