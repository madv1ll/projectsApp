import { Text, TextInput, StyleSheet, TouchableOpacity, Button, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import { saveProyect, getProyect, updateProyect } from '../services/proyectsService'

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const ProyectFormScreen = ({ navigation, route }) => {

  const [Proyect, setProyect] = useState({
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

  const handleChange = (name, value) => setProyect({ ...Proyect, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveProyect(Proyect);
      } else {
        await updateProyect(route.params.id,Proyect);
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
      navigation.setOptions({ headerTitle: 'Updating a Proyect' });
      setEditing(true);
      (async () => {
        const proyect = await getProyect(route.params.id);
        setProyect({ name: proyect.name, price: proyect.price, startDate: proyect.startdate, finishDate: proyect.finishdate });
      })();
    } else {
      setProyect({
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
        placeholder='Proyect Name'
        onChangeText={text => handleChange('name', text)}
        value={Proyect.name}
      />
      <View style={styles.datesView}>
        <TextInput 
          editable= {false}
          style={styles.datesInput} 
          placeholder= 'Start Date'
          value={startDate.toISOString().split('T')[0]}/>
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepicker} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.datesView}>
        <TextInput 
        editable= {false}
          style={styles.datesInput} 
          placeholder= 'Finish Date' 
          value={finishDate.toISOString().split('T')[0]} 
        />
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepickerF} >
          <Text style={styles.buttonText}>Date</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder='Proyect Price'
        onChangeText={text => handleChange('price', text)}
        value={Proyect.price.toString()}
        keyboardType='numeric'
      />
      {
        !editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Add Proyect</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit} >
            <Text style={styles.buttonText}>Update Proyect</Text>
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
export default ProyectFormScreen