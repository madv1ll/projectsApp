import { Text, TextInput, StyleSheet, TouchableOpacity, Button, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import { createProject, getProject, updateProject } from '../services/projectsService'

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      <View style={styles.container}>
        <Text style={styles.labelText}>Project Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Project Name'
          onChangeText={text => handleChange('name', text)}
          value={Project.name}
        />
        <Text style={styles.labelText}>Start Date</Text>
        <View style={styles.datesView}>
          <TextInput
            editable={false}
            style={styles.datesInput}
            placeholder='Start Date'
            value={startDate.toLocaleDateString()}
          />
          <TouchableOpacity style={styles.buttonDates} onPress={showDatepicker}>
            <MaterialCommunityIcons name='calendar' size={25} color={'#ffffff'} />
          </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Finish Date</Text>
          <View style={styles.datesView}>
            <TextInput
              editable={false}
              style={styles.datesInput}
              placeholder='Finish Date'
              value={finishDate.toLocaleDateString()}
            />
            <TouchableOpacity style={styles.buttonDates} onPress={showDatepickerF}>
              <MaterialCommunityIcons name='calendar' size={25} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.labelText}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder='Project Price'
            onChangeText={text => handleChange('price', text)}
            value={Project.price.toString()}
            keyboardType='numeric'
          />
          {
            !editing ? (
              <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Add Project</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update Project</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </Layout>
    );
  };

  const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    },
    input: {
      width: '100%',
      marginBottom: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#bdbdbd',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    buttonSave: {
      marginTop: 20,
      width: '100%',
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#0a3d62',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
    },
    buttonUpdate: {
      marginTop: 20,
      width: '100%',
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#ff9800',
    },
    buttonDates: {
      width: '17%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a3d62',
    },
    datesView: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    datesInput: {
      flex: 1,
      marginRight: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#bdbdbd',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    labelText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#222f3e',
      alignSelf: 'flex-start',
      marginLeft: 10,
      },
  });
  
  
  export default ProjectFormScreen;