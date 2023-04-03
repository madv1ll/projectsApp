import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { addEmployee, getEmployee, getEmployees, updateEmployee } from '../services/employeesService';

const EmployeeFormScreen = ({ navigation, route } ) => {

    const [employee, setEmployee] = useState({
        name: '',
        lastname: '',
        startdate: '',
        finishdate: '',
        salary: '',
        proyectid: ''
    });
    const [editing, setEditing] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    const onChangeS = (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
        handleChange('startdate', currentDate.toISOString().split('T')[0]);
    };

    const onChangeF = (event, selectedDate) => {
        const currentDate = selectedDate;
        setFinishDate(currentDate);
        handleChange('finishdate', currentDate.toISOString().split('T')[0]);
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
          value: startDate,
          onChange: onChangeS,
          mode: 'date',
          is24Hour: true,
        });
    };

    const showDatepickerF = () => {
        DateTimePickerAndroid.open({
          value: finishDate,
          onChange: onChangeF,
          mode: 'date',
          is24Hour: true,
        });
      };

    const handleChange = (name, value) => setEmployee({ ...employee, [name]: value });

    const handleSubmit = async () => {
        try {
          if (!editing) {
            setEmployee({ ...employee, ["proyectid"]: route.params.proyectId.toString() })
            await addEmployee(employee);
            navigation.navigate('ProyectHome', {id: route.params.proyectId});
          } else {
            await updateEmployee(employee);
            navigation.navigate('ProyectHome', {id: employee.id});
          }
        } catch (error) {
          console.error(error);
        }
      };

    const formatDate = (dateP) =>{
    if (dateP == null || dateP == undefined || dateP == '' || dateP == ' ' || dateP){
        return new Date().toISOString().split('T')[0];
    }
    const d = new Date(dateP);
    month = '' + (d.getMonth() + 1);
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [day, month, year].join('-');
    };

    useEffect(() => {
        if (route.params && route.params.employeeToUpdate) {
            navigation.setOptions({ headerTitle: 'Updating an Employee' });
            setEditing(true);
            (async () => {
            const [data] = await getEmployee(route.params.employeeToUpdate.id);
            setEmployee({
               id: data.id,
                name: data.name,
                lastname: data.lastname,
                startdate: data.startdate,
                finishdate: data.finishdate,
                projectid: data.projectid,
                salary: data.salary, });
            })();
        } else{
          setEmployee({
            name: '',
            lastname: '',
            startdate: '',
            finishdate: '',
            projectid: route.params.proyectId,
            salary: '', });
        }
    },[]);

  return (
    <Layout>
      <Text style={styles.labelText}>Name</Text>
        <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={text => handleChange('name', text)}
        value={employee.name}
      />
      <Text style={styles.labelText}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        onChangeText={text => handleChange('lastname', text)}
        value={employee.lastname}
      />
      <Text style={styles.labelText}>Start Date</Text>
      <View style={styles.datesView}>
        <TextInput 
          editable= {false}
          style={styles.datesInput} 
          placeholder= 'Start Date'
          value={formatDate(employee.startdate)}/>
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepicker} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.labelText}>Finish Date</Text>
      <View style={styles.datesView}>
        <TextInput 
        editable= {false}
          style={styles.datesInput} 
          placeholder= 'Finish Date' 
          value={formatDate(employee.finishdate)} 
        />
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepickerF} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.labelText}>Salary</Text>
      <TextInput
        style={styles.input}
        placeholder='Salary'
        onChangeText={text => handleChange('salary', text)}
        value={employee.salary.toString()}
      />
      {
        !editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Add Employee</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Update Employee</Text>
          </TouchableOpacity>
        )
      }
      <TouchableOpacity style={styles.ButtonNew} onPress={() => console.log(employee.id)}>
        <Text>ConsoleLog</Text>
      </TouchableOpacity>
    </Layout>
  )
};
const styles = StyleSheet.create({
    input: {
      width: '90%',
      marginBottom: 7,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#ffffff',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ffffff',
      color: '#000000'
    },
    buttonSave: {
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#10ac84',
      color: '#ffffff',
      width: '90%',
  
    },
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
    },
    buttonUpdate:{
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#e58e26',
      color: '#ffffff',
      width: '90%',
    },
    buttonDates: {
      width: '20%',
      borderRadius: 5,
      paddingTop: 8,
      paddingBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#0a3d62"
    },
    datesView: {
      width: '90%',
      flexDirection: 'row',
      marginBottom: 10,
      marginBottom: 7,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#ffffff',
      borderRadius: 5,
      padding: 6,
      marginVertical: 10,
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    datesInput: {
      color: '#000000',
      width: '82%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    ButtonNew: {
      color: '#ffffff', 
      marginRight: 20, 
      padding: 8, 
      fontSize:18, 
      borderRadius: 100, 
      backgroundColor: '#10ac84'
    },
    buttonDates: {
      width: '20%',
      borderRadius: 5,
      paddingTop: 8,
      paddingBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#0a3d62"
    },
    labelText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
  });

export default EmployeeFormScreen