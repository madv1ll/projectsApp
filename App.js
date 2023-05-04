import React, { useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import ProjectHomeScreen from "./Screens/ProjectHomeScreen";
import ProjectFormScreen from "./Screens/ProjectFormScreen";
import ItemFormScreen from "./Screens/ItemFormScreen";
import EmployeeFormScreen from "./Screens/EmployeeFormScreen";
import { createTables } from "./config/dataBase";
import { AntDesign } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTintColor: '#ffffff',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Project App',
            headerRight: () => (
              <TouchableOpacity
                style={styles.buttonNew}
                onPress={() => navigation.navigate("ProjectForm")}>
                <AntDesign name="plussquare" size={35} color="#ffffff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProjectForm"
          component={ProjectFormScreen}
          options={{ title: 'Create a Project' }}
        />
        <Stack.Screen
          name="ProjectHome"
          component={ProjectHomeScreen}
          options={{ title: 'Your Projects' }}
        />
        <Stack.Screen
          name="ItemForm"
          component={ItemFormScreen}
          options={{ title: 'Create New Item' }}
        />
        <Stack.Screen
          name="EmployeeForm"
          component={EmployeeFormScreen}
          options={{ title: 'Create New Employee' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#222f3e',
  },
  headerTitleStyle: {
    color: '#ffffff',
  },
  buttonNew:{

  },
  headerButton: {
    width: '100%',
    marginRight: 20,
    padding: 10,
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: '#0a3d62',
    borderColor: '#0a3d50',
    color: '#ffffff',
  },
});

export default App;