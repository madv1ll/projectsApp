import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1976D2' />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    // paddingTop: StatusBar.currentHeight,
  },
});

export default Layout;