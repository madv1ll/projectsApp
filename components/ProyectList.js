import { FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProyectItem from './ProyectItem'
import { getProyects, deleteProyect } from '../api';
import { useIsFocused } from '@react-navigation/native';

const ProyectList = () => {

  const [proyects, setProyects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadProyects = async () => {
    const data = await getProyects();
    setProyects(data)
  };
  useEffect(() => {
    loadProyects();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteProyect(id);
    await loadProyects();
  }

  const renderItem = ({ item }) => {
    return <ProyectItem proyect={item} handleDelete={handleDelete}/>
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProyects();
    setRefreshing(false);
  })

  return (
    <FlatList
      style={{ width: '100%' }}
      data={proyects}
      keyExtractor={item => item.id + ''}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor="#0a3d62"
        />
      }
    />
  )
}

export default ProyectList