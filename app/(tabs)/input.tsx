import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputScreen = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited

  useEffect(() => {
    // Load items from AsyncStorage when the component mounts
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Failed to load items from AsyncStorage:', error);
      }
    };

    loadItems();
  }, []);

  const handleSubmit = async () => {
    if (!itemName || !price || !category) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (editingItemId) {
      // Update existing item
      const updatedItems = items.map((item) =>
        item.id === editingItemId
          ? { ...item, itemName, price, category }
          : item
      );

      try {
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems);
        Alert.alert('Success', 'Item updated successfully!');
      } catch (error) {
        console.error('Failed to update item in AsyncStorage:', error);
        Alert.alert('Error', 'Failed to update item.');
      }

      setEditingItemId(null); // Clear editing state
    } else {
      // Add a new item
      const newItem = {
        id: Date.now().toString(),
        itemName,
        price,
        category,
      };

      const updatedItems = [...items, newItem];

      try {
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setItems(updatedItems);
        Alert.alert('Success', 'Item added successfully!');
      } catch (error) {
        console.error('Failed to save items to AsyncStorage:', error);
        Alert.alert('Error', 'Failed to save item.');
      }
    }

    // Reset form fields
    setItemName('');
    setPrice('');
    setCategory('');
  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);

    try {
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setItems(updatedItems);
    } catch (error) {
      console.error('Failed to delete item from AsyncStorage:', error);
      Alert.alert('Error', 'Failed to delete item.');
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id); // Set the item to be edited
    setItemName(item.itemName);
    setPrice(item.price);
    setCategory(item.category);
  };

  return (
    <View className="flex-1 bg-gray-100 p-6">
      <Text className="text-lg font-semibold mb-2">
        {editingItemId ? 'Edit Item' : 'Add Item'}
      </Text>

      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4 text-base"
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />

      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4 text-base"
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-6 text-base"
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-md mb-6"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {editingItemId ? 'Update' : 'Submit'}
        </Text>
      </TouchableOpacity>

      <Text className="text-lg font-bold mb-4">Stored Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 mb-2 rounded-md shadow">
            <View>
              <Text className="text-base font-medium">{item.itemName}</Text>
              <Text className="text-sm text-gray-600">Price: {item.price}</Text>
              <Text className="text-sm text-gray-600">
                Category: {item.category}
              </Text>
            </View>
            <View className="flex-row gap-2 space-x-2">
              <TouchableOpacity
                className="bg-green-500 p-2 rounded-md"
                onPress={() => handleEdit(item)}
              >
                <Text className="text-white">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 p-2 rounded-md"
                onPress={() => handleDelete(item.id)}
              >
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default InputScreen;
