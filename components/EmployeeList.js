import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const EmployeeList = ({ employee, handleDelete }) => {

  const navigation = useNavigation();
  const sDate = employee.startDate.split('-')[2] + '-' + employee.startDate.split('-')[1] + '-' + employee.startDate.split('-')[0];
  const fDate = employee.finishDate.split('-')[2] + '-' + employee.finishDate.split('-')[1] + '-' + employee.finishDate.split('-')[0];
  
  return (
    <View style={styles.employeeContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textEmployee}>Name: {employee.name}</Text>
        <Text style={styles.textEmployee}>Last Name: {employee.lastName}</Text>
        <Text style={styles.textEmployee}>Start Date: {sDate}</Text>
        <Text style={styles.textEmployee}>Finish Date: {fDate}</Text>
        <Text style={styles.textEmployee}>Salary: {employee.salary}</Text>
        <Text style={styles.textEmployee}>Total Days: {employee.workDays}</Text>
      </View>
      <View>
        <TouchableOpacity 
          style={styles.buttonUpdate}
          onPress={() => navigation.navigate('EmployeeForm', { employeeToUpdate: employee })}
        >
          <MaterialIcons name="edit" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => handleDelete(employee.id)}
        >
          <MaterialIcons name="delete" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  employeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  textEmployee: {
    fontSize: 15,
    color: '#222f3e',
  },
  buttonUpdate: {
    backgroundColor: '#0a3d62',
    padding: 7,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonDelete: {
    backgroundColor: '#ee5253',
    padding: 7,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default EmployeeList;