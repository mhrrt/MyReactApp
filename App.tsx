/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen"; // Move existing UI to HomeScreen.tsx
import HelpScreen from "./HelpScreen"; // Import Help Screen

const Stack = createStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Home Screen with Navigation Bar */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "राम सलाका",
            headerRight: () => (
              <Icon
                name="help-circle-outline"
                size={25}
                color="black"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Help")}
              />
            ),
          })}
        />
        {/* Help Screen */}
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Help" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;