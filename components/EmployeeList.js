import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const EmployeeList = ({ employee, handleDelete }) => {

  const navigation = useNavigation();
  const sDate = employee.startDate.split('-')[2]+'-'+employee.startDate.split('-')[1]+'-'+employee.startDate.split('-')[0];
  const fDate = employee.finishDate.split('-')[2]+'-'+employee.finishDate.split('-')[1]+'-'+employee.finishDate.split('-')[0];
  return (
    <View style={styles.employeeContainer}>
      <View >
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
          onPress={() => navigation.navigate('EmployeeForm', {employeeToUpdate: employee})}
          >
          <Text style={{ color: '#ffffff' }}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete }
          onPress={() => handleDelete(employee.id)}
          >
        <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
    employeeContainer: {
      backgroundColor: '#333333',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textEmployee: {
      fontSize: 15,
      color: '#ffffff',
    },
    buttonUpdate: {
      backgroundColor: "#0a3d62",
      padding: 7, 
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonDelete: {
      backgroundColor: "#ee5253", 
      padding: 7, 
      borderRadius: 5
    },
  });

export default EmployeeList