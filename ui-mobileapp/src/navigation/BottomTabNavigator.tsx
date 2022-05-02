import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Message, Missions, Shop, User } from "../assets/icons";
import { Text } from "../components/atoms/Text";
import ChatScreen from "../screens/Chat";
import MissionsScreen from "../screens/Missions";
import ProfileScreen from "../screens/Profile";
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
    component: ChatScreen,
    Icon: Message,
  },
  {
    title: "Profil",
    component: ProfileScreen,
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
          paddingBottom: 8,
          paddingTop: 2,
          backgroundColor: theme.colors.white[600],
          height: 60,
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
              <Text size="xs" color={focused ? "black" : "grey"}>
                {title}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Icon color={focused ? "black" : undefined} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
