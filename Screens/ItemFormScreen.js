import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../components/Layout';
import { createItem, getItem, updateItem } from '../services/itemService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ItemFormScreen = ({ navigation, route  }) => {
  const [item, setItem] = useState({
    name: '',
    unitPrice: '',
    quantity: '',
    totalPrice: '',
    projectid: '',
    purchaseDate: '',
  });

  const [editing, setEditing] = useState(false);
  const [purchaseDate, setPurchasedate] = useState(new Date());

  const handleChange = (name, value) => setItem({ ...item, [name]: value });
  const handleSubmit = async () => {
    try {
      if (!editing) {
        setItem({ ...item, ["projectid"]: route.params.projectid.toString() })
        await createItem(item);
        navigation.navigate('ProjectHome', {id: route.params.projectid});

      } else {
          await updateItem(item);
        navigation.navigate('ProjectHome', {id: route.params.itemToUpdate.projectid});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateP) =>{
    if (dateP == null || dateP == undefined || dateP == '' || dateP == ' ' || dateP){
      return new Date().toISOString().split('T')[0];
    }
      const d = new Date(dateP);
      month = '' + (d.getMonth() + 1);
      day = '' + d.getDate(),
      year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;


    return [day, month, year].join('-');
  }
  const onChangeS = (event, selectedDate) => {
    const currentDate = selectedDate;
    setPurchasedate(currentDate);
    handleChange('purchaseDate', currentDate.toISOString().split('T')[0]);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: purchaseDate,
      onChange: onChangeS,
      mode: 'date',
      is24Hour: true,
    });
  };

  useEffect(() => {
    if (route.params && route.params.itemToUpdate) {
      navigation.setOptions({ headerTitle: 'Updating an Item' });
      setEditing(true);
      (async () => {
        try{
          const [data] = await getItem(route.params.itemToUpdate.id);
          console.log("data",data)
          setItem({
            id: data.id,
            name: data.name,
            unitPrice: data.unitPrice,
            quantity: data.quantity,
            totalPrice: data.totalPrice,
            projectid: data.projectid,
            purchaseDate: data.purchaseDate, });

        }catch(error){
          console.log(error)
        }
      })();
    } else{
      setItem({
        name: '',
        unitPrice: '',
        quantity: '',
        totalPrice: '',
        projectid: route.params.projectid,
        purchaseDate: purchaseDate.toISOString().split('T')[0] });
    }
  },[]);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.labelText}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Item Name'
          onChangeText={(text) => handleChange('name', text)}
          value={item.name}
        />
        <Text style={styles.labelText}>Unit Price</Text>
        <TextInput
          style={styles.input}
          placeholder='Unit Price'
          onChangeText={text => handleChange('unitPrice', text)}
          value={item.unitPrice.toString()}
          keyboardType='numeric'
        />
        <Text style={styles.labelText}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder='Quantity'
          onChangeText={text => handleChange('quantity', text)}
          value={item.quantity.toString()}
          keyboardType='numeric'
        />
        <Text style={styles.labelText}>Total Price</Text>
        <TextInput
          style={styles.input}
          placeholder='Total Price'
          onChangeText={(text) => handleChange('totalPrice', text)}
          value={item.totalPrice.toString()}
          keyboardType='numeric'
        />
        <Text style={styles.labelText}>Purchase Date</Text>
        <View style={styles.datesView}>
        <TextInput
          editable={false}
          style={styles.datesInput}
          placeholder='Purchase Date'
          onChangeText={(text) => handleChange('purchaseDate', text)}
          value={purchaseDate.toISOString().split('T')[0].split('-')[2] + '-' + purchaseDate.toISOString().split('T')[0].split('-')[1] + '-' + purchaseDate.toISOString().split('T')[0].split('-')[0]}
        />
        <TouchableOpacity style={styles.buttonDates} onPress={showDatepicker}>
          <MaterialCommunityIcons name='calendar' size={25} color='#ffffff' />
        </TouchableOpacity>
        </View>
          {!editing ? (
          <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          ) : (
          <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Item</Text>
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
  buttonUpdate: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#ff9800',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
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
  buttonDates: {
    width: '17%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a3d62',
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222f3e',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});

export default ItemFormScreen;
