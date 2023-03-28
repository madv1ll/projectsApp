import { View, Text, StyleSheet } from 'react-native'

const ProyectDetailItemsList = ( {item} ) => {
  return (
    <View style = {styles.itemContainer} >
        <Text style = {styles.textItem}>{item.name}</Text>
        <Text style = {styles.textItem}>{item.quantity}</Text>
        <Text style = {styles.textItem}>{item.unitprice}</Text>
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
        textAlign: 'center',
        margin: 10,
      }
});
export default ProyectDetailItemsList