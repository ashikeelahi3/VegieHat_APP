import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native'
import { products } from '@/data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const input2 = () => {
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  return (
    <View className='flex bg-gray-100 p-6'>
      <View className='flex flex-wrap flex-row'>
        {
          products.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              className='border border-gray-300 rounded-md p-3 mb-4 w-1/2'
              onPress={() => Alert.alert('Item Details', `Name: ${product.name}`)}
            > 
              <Text>{product.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

export default input2