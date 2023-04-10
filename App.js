import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import ProjectHomeScreen from "./Screens/ProjectHomeScreen";
import ProjectFormScreen from "./Screens/ProjectFormScreen";
import ItemFormScreen from "./Screens/ItemFormScreen";
import EmployeeFormScreen from "./Screens/EmployeeFormScreen";
import { createTables } from "./config/dataBase";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    createTables();
  },[]);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({navigation}) => ({ 
            title : 'Project App',
            headerStyle: {backgroundColor: '#222f3e'}, 
            headerTitleStyle: {color: '#ffffff'},
            headerRight: () => (
              <TouchableOpacity onPress={ () => navigation.navigate("ProjectForm")}>
                <Text style={{color: '#ffffff', marginRight: 20, padding: 8, fontSize:18, borderRadius: 100, backgroundColor: '#10ac84'}}> New </Text>
              </TouchableOpacity>
              )
            })
          } 
        />
        <Stack.Screen
          name="ProjectForm"
          component={ProjectFormScreen}
          options={{
            title: 'Create a Project',
            headerStyle: {backgroundColor: '#222f3e'}, 
            headerTitleStyle: {color: '#ffffff'},
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="ProjectHome"
          component={ProjectHomeScreen}
          options={{
            title: 'Your Projects',
            headerStyle: {backgroundColor: '#222f3e'}, 
            headerTitleStyle: {color: '#ffffff'},
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="ItemForm"
          component={ItemFormScreen}
          options={{
            title: 'Create New Item',
            headerStyle: {backgroundColor: '#222f3e'}, 
            headerTitleStyle: {color: '#ffffff'},
            headerTintColor: '#ffffff',
          }}
        />
        <Stack.Screen
          name="EmployeeForm"
          component={EmployeeFormScreen}
          options={{
            title: 'Create New Employee',
            headerStyle: {backgroundColor: '#222f3e'}, 
            headerTitleStyle: {color: '#ffffff'},
            headerTintColor: '#ffffff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;