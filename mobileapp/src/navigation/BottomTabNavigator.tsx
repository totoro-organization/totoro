import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Message, Missions, Shop, User } from "../assets/icons";
import { Text } from "../components/atoms/Text";
import MessagingScreen from "../screens/Messaging";
import MissionsScreen from "../screens/Missions";
import MyAccountScreen from "../screens/MyAccount";
import ShopScreen from "../screens/Shop";
import theme from "../theme/theme";

export type NavigationPagesProps = {
  title: string;
  component: () => JSX.Element;
  // FIXME: Find a better type here.
  Icon: (color: any) => JSX.Element;
};

const NAVIGATION_PAGES: NavigationPagesProps[] = [
  {
    title: "Missions",
    component: MissionsScreen,
    Icon: Missions,
  },
  {
    title: "Boutique",
    component: ShopScreen,
    Icon: Shop,
  },
  {
    title: "Messagerie",
    component: MessagingScreen,
    Icon: Message,
  },
  {
    title: "Profil",
    component: MyAccountScreen,
    Icon: User,
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={NAVIGATION_PAGES[0].title}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 24,
          paddingTop: 2,
          backgroundColor: theme.colors.white[600],
          height: 70,
        },
      }}
    >
      {NAVIGATION_PAGES.map(({ title, component, Icon }) => (
        <Tab.Screen
          key={title}
          name={title}
          component={component}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text size="xs" color={focused ? "primary" : "grey"}>
                {title}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon color={focused ? "primary" : undefined} size={20} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
