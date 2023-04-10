import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ItemDetail = ({ item, handleDelete }) => {

  const navigation = useNavigation();
  const pDate = item.purchaseDate.split('-')[2]+'-'+item.purchaseDate.split('-')[1]+'-'+item.purchaseDate.split('-')[0]
  
  return (
    <View style={styles.itemContainer} >
      <View >
        <Text style={styles.textItem}>Name: {item.name}</Text>
        <Text style={styles.textItem}>Quantity: {item.quantity}</Text>
        <Text style={styles.textItem}>Total Price: {item.totalPrice}</Text>
        <Text style={styles.textItem}>Purchase Date: {pDate}</Text>
      </View>
      <View >
        <TouchableOpacity 
          style={styles.buttonUpdate}
          onPress={() => navigation.navigate('ItemForm', {itemToUpdate: item})}
          >
          <Text style={{ color: '#ffffff' }}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete }
          onPress={() => handleDelete(item.id)}
          >
        <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#333333',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItem: {
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
export default ItemDetail