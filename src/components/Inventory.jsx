'use client';

import React, { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import CameraClassifier from './CameraClassifier';


const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [open, setOpen] = useState(false);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Inventory Management</h1>

      {/* Add Item Section */}
      <div className="mb-6">
        <input
          type="text"
          className="border rounded p-2 mr-2"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button
          className="bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded"
          style={{ backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '4px' }}
          onClick={() => {
            addItem(itemName);
            setItemName('');
          }}
        >
          Add Item
        </button>
      </div>
      
      {/* Capture Image and Classify */}
      {/* <CameraClassifier onItemAdd={addItem} /> */}


      {/* Inventory List */}
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-4">Inventory Items</h2>
        {inventory.map(({ name, quantity }) => (
          <div
            key={name}
            className="flex justify-between items-center mb-4 p-2 border-b"
          >
            <span className="text-xl">{name}</span>
            <div className="flex items-center">
              
              
              <button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 p-2 rounded mr-2"
                style={{ backgroundColor: 'red', color: 'white', padding: '8px', borderRadius: '4px' }}
                onClick={() => removeItem(name)}
              >
                Remove Item
              </button>

              <span className="text-lg mr-4">Quantity: {quantity}</span>

              <button
                className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded"
                style={{ backgroundColor: 'green', color: 'white', padding: '8px', borderRadius: '4px' }}
                onClick={() => addItem(name)}
              >
                Add More
              </button>
            </div>
          </div>
        ))}
      </div>

      

    </div>
  );
};

export default Inventory;
