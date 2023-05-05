import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ProjectItem = ({ project, handleDelete }) => {
  const navigation = useNavigation();
  const sDate = project.startDate.split('-')[2] + '-' + project.startDate.split('-')[1] + '-' + project.startDate.split('-')[0];
  const fDate = project.finishDate.split('-')[2] + '-' + project.finishDate.split('-')[1] + '-' + project.finishDate.split('-')[0];

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProjectHome', { id: project.id })}>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{project.name}</Text>
          <Text style={styles.itemSubtitle}>Start Date: {sDate}</Text>
          <Text style={styles.itemSubtitle}>Finish Date: {fDate}</Text>
          <Text style={styles.itemSubtitle}>Price: {project.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProjectForm', { id: project.id })}
          >
            <MaterialIcons name="edit" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => handleDelete(project.id)}
          >
            <MaterialIcons name="delete" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
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
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222f3e',
  },
  itemSubtitle: {
    fontSize: 14,
    marginBottom: 2,
    color: '#222f3e',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 8,
    backgroundColor: '#0a3d62',
    borderRadius: 4,
    padding: 6,
  },
  buttonDelete: {
    backgroundColor: '#ee5253',
    padding: 7,
    borderRadius: 5,
  },
});

export default ProjectItem;