import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { getProject} from '../services/projectsService'
import { deleteItem, getProjectItems } from '../services/itemService'
import { deleteEmployee, getEmployees } from '../services/employeesService';

import ItemDetail from './ItemDetail'
import EmployeeList from './EmployeeList';

const ProjectDetail = (id) => {

    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const [items, setItems] = useState([]);
    const [project, setProject] = useState([]);
    const [employee, setEmployee] = useState([]);
    
    const loadItems = async (id) =>{
      try{
        const data = await getProjectItems(id);
        setItems(data)
      }catch(error){
        console.log(error)
      }
    };
    
    const loadProject = async (id) => {
      try {
        const [data] = await getProject(id);
        setProject(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    const loadEmployees = async (id) => {
      try{
        const data = await getEmployees(id);
        setEmployee(data);
      }catch(error){
        console.log(error)
      }
    };
    const handleDelete = async (itemid) => {
        await deleteItem(itemid);
        loadItems(id.id);
        loadProject(id.id);
      }
    const handleEmployeeDelete = async (employeeid) => {
        await deleteEmployee(employeeid);
        loadEmployees(id.id);
    };  

    useEffect(() => {
        loadItems(id.id);
        loadProject(id.id);
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
        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Project: {project.name}</Text>
        <View >
            <View style={styles.itemTitleContainer}>
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold',}}>Items</Text>
                <TouchableOpacity style={styles.ButtonNew} onPress={ () => navigation.navigate('ItemForm', {projectid : id.id})}>
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
                <TouchableOpacity style={styles.ButtonNew} onPress={ () => navigation.navigate('EmployeeForm', {projectid : id.id})}>
                        <Text style={{color: '#ffffff'}}>New Employee</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                style={{ width: '100%' }}
                data={ employee }
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

export default ProjectDetail