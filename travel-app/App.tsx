import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import DetailScreen from "./screens/DetailScreen";
import AnimationScreen from "./screens/AnimationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PackingScreen from "./screens/PackingScreen";
import { DayType } from "./data";

const NAVY = "#1C2D5E";
const RUST = "#C2622D";
const BODY = "#4A4A4A";
const MUTED = "#888888";
const BG = "#FDFCF9";
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DA";

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { day: DayType };
};

type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Animation: undefined;
  Profile: undefined;
  Packing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: BG,
    height: 60,
    paddingBottom: 6,
    borderTopColor: BORDER,
  },
  stackContent: {
    backgroundColor: BG,
  },
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: RUST,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Categories") {
            iconName = "list-outline";
          } else if (route.name === "Animation") {
            iconName = focused ? "sparkles" : "sparkles-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Packing") {
            iconName = focused ? "bag" : "bag-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen
        name="Animation"
        component={AnimationScreen}
        options={{ tabBarLabel: "Animation Demo" }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Packing" component={PackingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: styles.stackContent,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { NAVY, RUST, BODY, MUTED, BG, WHITE, BORDER };
