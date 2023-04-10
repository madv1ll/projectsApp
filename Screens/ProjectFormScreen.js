import { Text, TextInput, StyleSheet, TouchableOpacity, Button, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import { createProject, getProject, updateProject } from '../services/projectsService'

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ProjectFormScreen = ({ navigation, route }) => {

  const [Project, setProject] = useState({
    name: '',
    startDate: '',
    finishDate: '',
    price: ''
  });
  const [editing, setEditing] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const onChangeS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
    handleChange('startDate', currentDate.toISOString().split('T')[0]);
  };
  const onChangeF = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFinishDate(currentDate);
    handleChange('finishDate', currentDate.toISOString().split('T')[0]);
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

  const handleChange = (name, value) => setProject({ ...Project, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await createProject(Project);
      } else {
        await updateProject(route.params.id,Project);
      }
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateP) =>{
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
    if (route.params && route.params.id) {
      navigation.setOptions({ headerTitle: 'Updating a Project' });
      setEditing(true);
      (async () => {
        try {
          const [project] = await getProject(route.params.id);
          setProject({ name: project.name, price: project.price, startDate: project.startDate, finishDate: project.finishDate });
          const sDate = project.startDate.split('-')[2]+'-'+project.startDate.split('-')[1]+'-'+project.startDate.split('-')[0];
          const fDate = project.finishDate.split('-')[2]+'-'+project.finishDate.split('-')[1]+'-'+project.finishDate.split('-')[0];
          setStartDate(new Date(sDate));
          setFinishDate(new Date(fDate));
        } catch {
          console.error(error);
        }
      })();
    } else {
      setProject({
        name: '',
        price: '',
        startDate: startDate.toISOString().split('T')[0],
        finishDate: finishDate.toISOString().split('T')[0]
      });
    }
  }, []);

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='Project Name'
        onChangeText={text => handleChange('name', text)}
        value={Project.name}
      />
      <View style={styles.datesView}>
        <TextInput 
          editable= {false}
          style={styles.datesInput} 
          placeholder= 'Start Date'
          value={startDate.toISOString().split('T')[0].split('-')[2]+'-'+startDate.toISOString().split('T')[0].split('-')[1]+'-'+startDate.toISOString().split('T')[0].split('-')[0]}/>
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepicker} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.datesView}>
        <TextInput 
        editable= {false}
          style={styles.datesInput} 
          placeholder= 'Finish Date' 
          value={finishDate.toISOString().split('T')[0].split('-')[2]+'-'+finishDate.toISOString().split('T')[0].split('-')[1]+'-'+finishDate.toISOString().split('T')[0].split('-')[0]}/>
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepickerF} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder='Project Price'
        onChangeText={text => handleChange('price', text)}
        value={Project.price.toString()}
        keyboardType='numeric'
      />
      {
        !editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Add Project</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Update Project</Text>
          </TouchableOpacity>
        )
      }

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
  }
})
export default ProjectFormScreen