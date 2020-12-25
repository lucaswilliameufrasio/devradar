import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const AppStack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <AppStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTintColor: "#FFF",
        headerBackTitle: false,
        headerStyle: {
          backgroundColor: "#7D40E7",
        },
      }}
    >
      <AppStack.Screen
        name="Main"
        component={Main}
        options={{
          title: "DevRadar",
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil do Github",
        }}
      />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default Routes;
