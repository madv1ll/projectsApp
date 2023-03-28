import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProyectItem = ({ proyect, handleDelete }) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <View
        onStartShouldSetResponder={() => navigation.navigate('ProyectHome', { id: proyect.id })}
        style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProyectHome', { id: proyect.id })}>
        <Text style={styles.itemTitle}>{proyect.name}</Text>
        <Text style={styles.itemTitle}>{proyect.price}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: "#ee5253", padding: 7, borderRadius: 5 }}
            onPress={() => handleDelete(proyect.id)}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#0a3d62", padding: 7, borderRadius: 5, }}
            onPress={() => navigation.navigate('ProyectForm', { id: proyect.id })}
          >
            <Text style={{ color: "white" }}>Modify</Text>
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
  }
});
export default ProyectItem