import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { getProyect, getProyectItems } from '../api'
import { useIsFocused } from '@react-navigation/native';

import ProyectDetailItemsList from '../components/ProyectDetailItemsList'

const ProyectDetail = (id) => {
    const isFocused = useIsFocused();

    const [items, setItems] = useState([]);
    const [proyect, setProyect] = useState([]);
    
    const loadItems = async (id) =>{
        const data = await getProyectItems(id);
        setItems(data)
    };

    const loadProyect = async (id) => {
        const data = await getProyect(id);
        setProyect(data);
    };

    useEffect(() => {
        loadItems(id.id);
        loadProyect(id.id);
    }, [isFocused]);
    
    const renderItem = ({ item }) => {
        return (<ProyectDetailItemsList item={ item } />)
      };
    
  return (
    <View>
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Proyecto:{proyect.name}</Text>
        <View >
            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Items</Text>
            <FlatList
            style={{ width: '100%' }}
            data={ items }
            keyExtractor={item => item.id + ''}
            renderItem={renderItem}
            />
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#333333',
        borderRadius: 10,
    }
});

export default ProyectDetail