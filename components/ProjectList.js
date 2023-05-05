import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, Text, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ProjectItem from './ProjectItem';
import { deleteProject, getProjects } from '../services/projectsService';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadProjects = async () => {
    try {
      const result = await getProjects();
      setProjects(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProject(id);
    await loadProjects();
  };

  const renderItem = ({ item }) => {
    return (
        <ProjectItem project={item} handleDelete={handleDelete} />
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects List</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor="#0a3d62" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
  },
  title: {
    color: '#222f3e',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default ProjectList;