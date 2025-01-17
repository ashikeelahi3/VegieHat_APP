import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import { products } from '@/data/data';
import { Picker } from '@react-native-picker/picker';



const Input2 = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseOption, setPurchaseOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // interface productObj {
  //   id: number;
  //   name: string;
  //   price: string | number;
  //   category: string;
  //   purchaseOption: string;
  // }

  
  const handleClick = (product: any) => {
    setSelectedProduct(product);
    setItemName(product.name);
    setModalVisible(true);
  };

  return (
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
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold">{selectedProduct?.name}</Text>
            <Text className="text-sm text-gray-500 mb-4">
              Please enter item price and category
            </Text>
            
            {/* Input Fields */}
            <TextInput
              className="border border-gray-300 rounded-md p-2 mb-3"
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
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

            {/* Dynamic Purchase Option Radio Buttons */}
            {selectedProduct?.purchaseOption && (
              <View className="mb-4">
                <Text className="text-base font-bold mb-2">Purchase Option</Text>
                
                {/* Flex Row for Radio Buttons */}
                <View className="flex flex-row items-center">
                  {selectedProduct.purchaseOption.map((option: string) => (
                    <TouchableOpacity
                      key={option}
                      className="flex-row items-center mr-2 rounded-lg border border-gray-300 p-2" // Added margin to space buttons
                      onPress={() => setPurchaseOption(option)}
                    >
                      <View
                        className={`w-5 h-5 rounded-full border-2 ${
                          purchaseOption === option ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                        } justify-center items-center`}
                      >
                        {purchaseOption === option && (
                          <View className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </View>
                      <Text className="ml-2 text-base">{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}



            {/* Buttons */}
            <View className="flex flex-row justify-end">
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <View className="w-2" />
              <Button 
                title="Save" 
                onPress={() => {
                  // Save action (implement logic here)
                  setModalVisible(false);
                }} 
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Input2;
