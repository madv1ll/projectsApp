import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const EmployeeList = ({ employee, handleDelete }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.employeeContainer}>
      <View >
        <Text style={styles.textEmployee}>Name: {employee.name}</Text>
        <Text style={styles.textEmployee}>Last Name: {employee.lastname}</Text>
        <Text style={styles.textEmployee}>Start Date: {employee.startdate}</Text>
        <Text style={styles.textEmployee}>Finish Date: {employee.finishdate}</Text>
        <Text style={styles.textEmployee}>Salary: {employee.salary}</Text>
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