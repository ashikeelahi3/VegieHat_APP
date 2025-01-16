// context/ItemsContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the Item type
export interface Item {
  id: string;
  itemName: string;
  price: number;
  category: string;
}

// Create the context
const ItemsContext = createContext<any>(null);

// Create the provider for ItemsContext
export const ItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [editedItem, setEditedItem] = useState<Item | null>(null);

  // Add a new item
  const addItem = (item: Item) => {
    if (!item.itemName.trim() || !item.category.trim() || item.price <= 0) {
      console.error('Invalid item data');
      return;
    }
    setItems((prevItems) => [...prevItems, item]);
  };

  // Edit an existing item
  const editItem = (id: string, price: number, itemName: string, category: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, price, itemName, category } : item))
    );
    setEditedItem(null);
  };

  // Start editing an item
  const startEditing = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditedItem(item);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditedItem(null);
  };

  // Remove an item
  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider
      value={{
        items,
        addItem,
        editItem,
        startEditing,
        cancelEditing,
        removeItem,
        editedItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

// Custom hook to use the ItemsContext
export const useItems = () => useContext(ItemsContext);
