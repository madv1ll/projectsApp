import { View, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Layout = ({ children }) => {
    return <View 
            style={styles.container}>
                <StatusBar backgroundColor= '#14163f' />
                {children}
            </View>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#14163f',
        padding: 20,
        flex: 1,
        alignItems: 'center',
    }
});
export default Layout