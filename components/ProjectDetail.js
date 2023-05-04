import { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView  } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { getProject} from '../services/projectsService'
import { deleteItem, getProjectItems } from '../services/itemService'
import { deleteEmployee, getEmployees } from '../services/employeesService';

import ItemDetail from './ItemDetail'
import EmployeeList from './EmployeeList';

import { generateExcel } from "../config/excel";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

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
    <>
      <View style={styles.pageTitle}>
        <Text style={styles.projectTitle}>Project: {project.name}</Text>
        <TouchableOpacity 
          style={styles.excelButton}
          onPress={() => generateExcel(project, items, employee)}
        >
          <FontAwesome5 name="file-excel" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>Items</Text>
        <TouchableOpacity
        style={styles.newButton}
        onPress={() => navigation.navigate('ItemForm', { projectid: id.id })}
        >
          <Ionicons name="create" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ height: '50%' }}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.itemTitleContainer}>
        <Text style={styles.itemTitle}>Employees</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate('EmployeeForm', { projectid: id.id })}
        >
        <Ionicons name="create" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
        <FlatList
        style={{ height: '50%' , marginBottom: 10 }}
        data={employee}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEmployee}
        />
    </ >
  )
};
const styles = StyleSheet.create({
  pageTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#222f3e',
  },
  excelButton: {
    backgroundColor: '#0a3d62',
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: '#222f3e',
    fontSize: 20,
    fontWeight: 'bold',
  },
  newButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0a3d62',
    marginRight: 250,
  },
});

export default ProjectDetail;