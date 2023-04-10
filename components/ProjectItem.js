import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProjectItem = ({ project, handleDelete }) => {

  const navigation = useNavigation();
  const sDate = project.startDate.split('-')[2]+'-'+project.startDate.split('-')[1]+'-'+project.startDate.split('-')[0];
  const fDate = project.finishDate.split('-')[2]+'-'+project.finishDate.split('-')[1]+'-'+project.finishDate.split('-')[0];

  return (
    <TouchableOpacity>
      <View
        onStartShouldSetResponder={() => {navigation.navigate('ProjectHome', { id: project.id})}}
        style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProjectHome', { id: project.id })}>
        <Text style={styles.itemTitle}>Name : {project.name}</Text>
        <Text style={styles.itemTitle}>Start Date : {sDate}</Text>
        <Text style={styles.itemTitle}>Finish Date : {fDate}</Text>
        <Text style={styles.itemTitle}>Price : {project.price}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={ styles.buttonUpdate }
            onPress={() => navigation.navigate('ProjectForm', { id: project.id })}
          >
            <Text style={{ color: "white" }}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDelete }
            onPress={() => handleDelete(project.id)}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#333333',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: '#ffffff'
  },
  buttonUpdate: {
    backgroundColor: "#0a3d62", 
    padding: 7, 
    borderRadius: 5, 
    marginBottom:10
  },
  buttonDelete: {
    backgroundColor: "#ee5253", 
    padding: 7, 
    borderRadius: 5
  }
});
export default ProjectItem