import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { products, onlineShops } from '@/data/data';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Input2 = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseOption, setPurchaseOption] = useState('');
  const [shopType, setShopType] = useState('');
  const [shopName, setShopName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  // Remove non-numeric characters (including "-")
  const handlePriceChange = (value: string) => {
    const filteredValue = value.replace(/[^0-9.]/g, "");
    setPrice(filteredValue);
  };

  // Function to load cart data from AsyncStorage
  const loadCartFromStorage = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  // Function to save cart data to AsyncStorage
  const saveCartToStorage = async (updatedCart: any[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  // Load cart on component mount
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const handleClick = (product: any) => {
    setSelectedProduct(product);
    setItemName(product.name);
    setModalVisible(true);
  };

  const handleAddToCart = () => {
    if (!price || !selectedProduct) {
      alert('Please enter all required fields');
      return;
    }

    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price,
      category: category || 'N/A',
      purchaseOption: purchaseOption || 'N/A',
      shopType: shopType || 'N/A',
      shopName: shopName || 'N/A',
    };

    if (isEditMode && editingItemId !== null) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === editingItemId ? { ...item, ...cartItem } : item
        )
      );
      setIsEditMode(false);
      setEditingItemId(null);
    } else {
      setCart((prevCart) => [...prevCart, cartItem]);
    }

    setPrice('');
    setCategory('');
    setPurchaseOption('');
    setShopType('');
    setShopName('');
    setModalVisible(false);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleEditCartItem = (item: any) => {
    setSelectedProduct(products.find((product) => product.id === item.id));
    setPrice(item.price);
    setCategory(item.category !== 'N/A' ? item.category : '');
    setPurchaseOption(item.purchaseOption !== 'N/A' ? item.purchaseOption : '');
    setShopType(item.shopType !== 'N/A' ? item.shopType : '');
    setShopName(item.shopName !== 'N/A' ? item.shopName : '');
    setIsEditMode(true);
    setEditingItemId(item.id);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex bg-gray-100 p-6'>
          <View className='flex flex-wrap flex-row'>
            {products.map((product: any) => (
              <TouchableOpacity 
                key={product.id} 
                className='border border-gray-300 rounded-md p-3 mb-4 w-1/2'
                onPress={() => handleClick(product)}
              > 
                <Text>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black opacity-90">
              <View className="bg-white p-6 rounded-lg w-11/12">
                <Text className="text-lg font-bold">{selectedProduct?.name}</Text>
                <Text className="text-sm text-gray-500 mb-4">
                  Please enter item details
                </Text>
                
                {/* Input Fields */}
                <TextInput
                  className="border border-gray-300 rounded-md p-2 mb-3"
                  placeholder="Enter price"
                  value={price}
                  onChangeText={handlePriceChange}
                  keyboardType="numeric"
                />
                {/* Dynamic Categories Dropdown */}
                {selectedProduct?.categories && (
                  <View className="mb-4">
                    <Text className="text-base font-bold mb-2">Category</Text>
                    <View className="border border-gray-300 rounded-md">
                      <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                      >
                        <Picker.Item label="Select a category" value="" />
                        {selectedProduct.categories.map((cat: string) => (
                          <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                )}

                {/* Dynamic Purchase Option Buttons */}
                {selectedProduct?.purchaseOption && (
                  <View className="mb-4">
                    <Text className="text-base font-bold mb-2">Purchase Option</Text>
                    <View className="flex flex-wrap flex-row">
                      {selectedProduct.purchaseOption.map((option: string) => (
                        <TouchableOpacity
                          key={option}
                          className={`border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2 ${
                            purchaseOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'
                          }`}
                          onPress={() => setPurchaseOption(option)}
                        >
                          <Text className={purchaseOption === option ? 'text-white' : 'text-black'}>{option}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Type of Shop Buttons */}
                <View className="mb-4">
                  <Text className="text-base font-bold mb-2">Type of Shop</Text>
                  <View className="flex flex-wrap flex-row">
                    {["Online/Supershop", "Traditional", "Other"].map((type) => (
                      <TouchableOpacity
                        key={type}
                        className={`border border-gray-300 rounded-md px-2 py-2 mr-1 mb-2 ${
                          shopType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                        onPress={() => {
                          setShopType(type)
                          setShopName('')
                        }}
                      >
                        <Text className={shopType === type ? 'text-white' : 'text-black'}>{type}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Shop Name Dropdown */}
                {shopType === 'Online/Supershop' && (
                  <View className="mb-4">
                    <Text className="text-base font-bold mb-2">Shop Name</Text>
                    <View className="border border-gray-300 rounded-md">
                      <Picker
                        selectedValue={shopName}
                        onValueChange={(itemValue) => setShopName(itemValue)}
                      >
                        <Picker.Item label="Select a shop" value="" />
                        {onlineShops.map((shop) => (
                          <Picker.Item key={shop} label={shop} value={shop} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                )}

                {/* Buttons */}
                <View className="flex flex-row justify-end">
                  <Button title="Cancel" onPress={() => setModalVisible(false)} />
                  <View className="w-2" />
                  <Button 
                    title={isEditMode ? "Update" : "Save"} 
                    onPress={handleAddToCart} 
                  />
                </View>
              </View>
            </View>
          </Modal>

          {/* Cart Section */}
          <View className="mt-6">
            {cart.length && <Text className="text-lg font-bold mb-4">Saved Items</Text>}
            {cart.length === 0 ? "" : (
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex flex-row justify-between items-center border border-gray-300 p-3 mb-2 rounded-md">
                    <View>
                      <Text className="font-bold">{item.name}</Text>
                      <Text className="text-sm text-gray-500">Price: {item.price}</Text>
                      {item.category !=="N/A" && <Text className="text-sm text-gray-500">Category: {item.category}</Text>}
                      {item.purchaseOption !== 'N/A' && <Text className="text-sm text-gray-500">Option: {item.purchaseOption}</Text>}
                      <Text className="text-sm text-gray-500">Shop Type: {item.shopType}</Text>
                      {item.shopName !== 'N/A' && <Text className="text-sm text-gray-500">Shop Name: {item.shopName}</Text>}
                    </View>
                    <View className="flex flex-row">
                      <TouchableOpacity
                        className="bg-green-500 p-2 rounded-md mr-2"
                        onPress={() => handleEditCartItem(item)}
                      >
                        <Text className="text-white">Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="bg-red-500 p-2 rounded-md"
                        onPress={() => handleRemoveFromCart(item.id)}
                      >
                        <Text className="text-white">Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Input2;
