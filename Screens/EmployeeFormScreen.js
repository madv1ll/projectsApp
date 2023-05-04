import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { createEmployee, getEmployee, updateEmployee } from '../services/employeesService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EmployeeFormScreen = ({ navigation, route }) => {
  const [employee, setEmployee] = useState({
    name: '',
    lastname: '',
    startdate: '',
    finishdate: '',
    salary: '',
    projectid: '',
    workdays: '',
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

  const showDatepicker = async () => {
    try {
      const { action, year, month, day } = await DateTimePickerAndroid.open({
        value: startDate,
        mode: 'date',
        is24Hour: true,
      });
      if (action === DateTimePickerAndroid.dateSetAction) {
        const selectedDate = new Date(year, month, day);
        setStartDate(selectedDate);
        handleChange('startdate', selectedDate.toISOString().split('T')[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showDatepickerF = async () => {
    try {
      const { action, year, month, day } = await DateTimePickerAndroid.open({
        value: finishDate,
        mode: 'date',
        is24Hour: true,
      });
      if (action === DateTimePickerAndroid.dateSetAction) {
        const selectedDate = new Date(year, month, day);
        setFinishDate(selectedDate);
        handleChange('finishdate', selectedDate.toISOString().split('T')[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setEmployee({ ...employee, [name]: value });

  const handleSubmit = async () => {
    try {
      if (!editing) {
        setEmployee({ ...employee, projectid: route.params.projectid });
        try {
          await createEmployee(employee);
        } catch (error) {
          console.log(error);
        }
        navigation.navigate('ProjectHome', { id: route.params.projectid });
      } else {
        try {
          await updateEmployee(employee);
        } catch (error) {
          console.log(error);
        }
        navigation.navigate('ProjectHome', { id: employee.projectid });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateP) => {
    if (!dateP || dateP === '' || dateP === ' ') {
      return new Date().toISOString().split('T')[0];
    }
    const d = new Date(dateP);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [day, month, year].join('-');
  };

  useEffect(() => {
    if (route.params && route.params.employeeToUpdate) {
      navigation.setOptions({ headerTitle: 'Updating an Employee' });
      setEditing(true);
      (async () => {
        try {
          const [data] = await getEmployee(route.params.employeeToUpdate.id);
          setEmployee({
            id: data.id,
            name: data.name,
            lastname: data.lastName,
            startdate: data.startDate,
            finishdate: data.finishDate,
            projectid: data.projectId,
            salary: data.salary,
            workdays: data.workDays,
          });
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setEmployee({
        name: '',
        lastname: '',
        startdate: startDate.toISOString().split('T')[0],
        finishdate: startDate.toISOString().split('T')[0],
        projectid: route.params.projectid,
        salary: '',
        workdays: '',
      });
    }
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          onChangeText={(text) => handleChange('name', text)}
          value={employee.name}
        />
        <Text style={styles.labelText}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          onChangeText={(text) => handleChange('lastname', text)}
          value={employee.lastname}
        />
        <Text style={styles.labelText}>Start Date</Text>
        <View style={styles.datesView}>
          <TextInput
            editable={false}
            style={styles.datesInput}
            placeholder='Start Date'
            value={startDate.toISOString().split('T')[0]}
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
            value={finishDate.toISOString().split('T')[0]}
          />
          <TouchableOpacity style={styles.buttonDates} onPress={showDatepickerF}>
            <MaterialCommunityIcons name='calendar' size={25} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.labelText}>Salary</Text>
        <TextInput
          style={styles.input}
          placeholder='Salary'
          onChangeText={(text) => handleChange('salary', text)}
          value={employee.salary.toString()}
          inputMode='numeric'
        />
        <Text style={styles.labelText}>Work Days</Text>
        <TextInput
          style={styles.input}
          placeholder='Work Days'
          onChangeText={(text) => handleChange('workdays', text)}
          value={employee.workdays.toString()}
          inputMode='numeric'
        />
        {!editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Employee</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update Employee</Text>
          </TouchableOpacity>
        )}
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

export default EmployeeFormScreen;