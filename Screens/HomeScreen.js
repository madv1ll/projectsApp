import React from 'react';
import { View, StyleSheet } from 'react-native';

import Layout from '../components/Layout';
import ProjectList from '../components/ProjectList';

const HomeScreen = () => (
  <Layout>
    <ProjectList />
  </Layout>
);

export default HomeScreen;