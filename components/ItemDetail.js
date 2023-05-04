import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ItemDetail = ({ item, handleDelete }) => {
  const navigation = useNavigation();
  const pDate = item.purchaseDate.split('-')[2] + '-' + item.purchaseDate.split('-')[1] + '-' + item.purchaseDate.split('-')[0];

  return (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.textItem}>Name: {item.name}</Text>
        <Text style={styles.textItem}>Quantity: {item.quantity}</Text>
        <Text style={styles.textItem}>Total Price: {item.totalPrice}</Text>
        <Text style={styles.textItem}>Purchase Date: {pDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={() => navigation.navigate('ItemForm', { itemToUpdate: item })}
        >
          <MaterialIcons name="edit" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
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
  textItem: {
    fontSize: 15,
    color: '#222f3e',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
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

export default ItemDetail;