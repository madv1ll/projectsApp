import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import HomeScreen from "./Screens/HomeScreen";
import ProyectFormScreen from "./Screens/ProyectFormScreen";
import ProyectHomeScreen from "./Screens/ProyectHomeScreen";

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={({navigation}) => ({ 
                        title : 'Proyect App',
                        headerStyle: {backgroundColor: '#222f3e'}, 
                        headerTitleStyle: {color: '#ffffff'},
                        headerRight: () => (
                            <TouchableOpacity onPress={ () => navigation.navigate("ProyectForm")}>
                                <Text style={{color: '#ffffff', marginRight: 20, padding: 8, fontSize:18, borderRadius: 100, backgroundColor: '#10ac84'}}> New </Text>
                            </TouchableOpacity>
                        )
                        })} />
                <Stack.Screen
                    name="ProyectForm"
                    component={ProyectFormScreen}
                    options={{
                        title: 'Create a Proyect',
                        headerStyle: {backgroundColor: '#222f3e'}, 
                        headerTitleStyle: {color: '#ffffff'},
                        headerTintColor: '#ffffff',
                    }}/>
                <Stack.Screen
                name="ProyectHome"
                component={ProyectHomeScreen}
                options={{
                    title: 'Your Proyects',
                    headerStyle: {backgroundColor: '#222f3e'}, 
                    headerTitleStyle: {color: '#ffffff'},
                    headerTintColor: '#ffffff',
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default App;