import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { getProyect} from '../services/proyectsService'
import { deleteItem, getProyectItems } from '../services/itemService'
import { getEmployees } from '../services/employeesService';

import ItemDetail from './ItemDetail'
import EmployeeList from './EmployeeList';

const ProyectDetail = (id) => {

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const [items, setItems] = useState([]);
    const [proyect, setProyect] = useState([]);
    const [employees, setEmployees] = useState([]);
    
    const loadItems = async (id) =>{
        const data = await getProyectItems(id);
        setItems(data)
    };
    
    const loadProyect = async (id) => {
        const data = await getProyect(id);
        setProyect(data);
    };
    
    const loadEmployees = async (id) => {
        const data = await getEmployees(id);
        setEmployees(data);
    };
    const handleDelete = async (itemid) => {
        await deleteItem(itemid);
        loadItems(id.id);
        loadProyect(id.id);
      }
    const handleEmployeeDelete = async (employeeid) => {
        await deleteEmployee(employeeid);
        loadEmployees(id.id);
    };  

    useEffect(() => {
        loadItems(id.id);
        loadProyect(id.id);
        loadEmployees(id.id);
    }, [isFocused]);
    
    const renderItem = ({ item }) => {
        return <ItemDetail item={ item } handleDelete={handleDelete}/>
      };

    const renderEmployee = ({ item }) => {
        return <EmployeeList employee={ item } handleDelete={ handleEmployeeDelete } />
    };
    
  return (
    <View style={{width: '100%'}}>
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Proyecto: {proyect.name}</Text>
        <View >
            <View style={styles.itemTitleContainer}>
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold',}}>Items</Text>
                <TouchableOpacity style={styles.ButtonNew} onPress={ () => navigation.navigate('ItemForm', {proyectId : id.id})}>
                    <Text style={{color: '#ffffff'}}>New Item</Text>
                </TouchableOpacity>
            </View >
            <View>
                <FlatList
                style={{ width: '100%' }}
                data={ items }
                keyExtractor={item => item.id + ''}
                renderItem={renderItem}
                />
            </View>
            <View style={styles.itemTitleContainer}>
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold',}}>Employees</Text>
                <TouchableOpacity style={styles.ButtonNew} onPress={ () => navigation.navigate('EmployeeForm', {proyectId : id.id})}>
                        <Text style={{color: '#ffffff'}}>New Employee</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                style={{ width: '100%' }}
                data={ employees }
                keyExtractor={item => item.id + ''}
                renderItem={ renderEmployee }
                />
            </View>
        </View>
    </View>
  )
};
const styles = StyleSheet.create({
    itemTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ButtonNew: {
        color: '#ffffff', 
        marginRight: 20, 
        padding: 8, 
        fontSize:18, 
        borderRadius: 100, 
        backgroundColor: '#10ac84'
    },
});

export default ProyectDetail