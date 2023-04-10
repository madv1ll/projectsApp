import React, { useState, useEffect } from 'react'
import { FlatList, RefreshControl, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import ProjectItem from './ProjectItem'
import { deleteProject, getProjects } from '../services/projectsService';

const ProjectList = () => {

  const [project, setProject] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadProjects = async () => {
    try {
      const result = await getProjects();
      setProject(result)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProjects();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProject(id);
    await loadProjects();
  }

  const renderItem = ({ item }) => {
    return <ProjectItem project={item} handleDelete={handleDelete} />
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  })

  return (
    <>
      <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Projects List</Text>
      <FlatList
        style={{ width: '100%' }}
        data={project}
        keyExtractor={item => item.id + ''}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor="#0a3d62"/>
        }
      />
    </>
  )
}

export default ProjectList