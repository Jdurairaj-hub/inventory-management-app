'use client';

import React, { useRef, useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { firestore } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const CameraClassifier = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectedItem, setDetectedItem] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const loadModel = async () => {
    try {
      setLoading(true);
      console.log("Loading MobileNetV2 model...");
      const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      setModel(loadedModel);
      console.log("Model loaded successfully!");

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error("Error accessing the camera: ", err);
          });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading the model: ", error);
      setLoading(false);
    }
  };

  const captureAndClassifyImage = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const imgData = canvasRef.current;
      const predictions = await model.classify(imgData);
      const detectedItem = predictions[0].className;

      setDetectedItem(detectedItem);
      setCapturedImage(canvasRef.current.toDataURL());
      setConfirmation(true);
    } else {
      console.error("Model not loaded or video/canvas reference not set.");
    }
  };

  const addItem = async (itemName) => {
    const docRef = doc(collection(firestore, 'inventory'), itemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
  };

  const confirmItem = async () => {
    if (detectedItem) {
      await addItem(detectedItem);
      setDetectedItem(null);
      setConfirmation(false);
      setCapturedImage(null);
    }
  };

  const cancelItem = () => {
    setDetectedItem(null);
    setConfirmation(false);
    setCapturedImage(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Classify and Add Item</h2>

      {!model && (
        <button
          className="bg-green-500 text-black hover:bg-green-700 p-2 rounded mb-4"
          onClick={loadModel}
          disabled={loading}
        >
          {loading ? 'Loading Model...' : 'Load Model'}
        </button>
      )}

      {model && (
        <>
          <div className="flex justify-center">
            <video
              ref={videoRef}
              autoPlay
              className="w-64 h-64 bg-gray-300"
            />
            <canvas
              ref={canvasRef}
              className="hidden"
              width="224"
              height="224"
            />
          </div>

          <button
            className="bg-blue-500 text-black hover:bg-blue-700 p-2 rounded mt-4"
            onClick={captureAndClassifyImage}
          >
            Capture & Classify
          </button>
        </>
      )}

      {capturedImage && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-xl font-bold mb-2">Captured Image:</h3>
          <img src={capturedImage} alt="Captured" className="w-64 h-64" />
        </div>
      )}

      {confirmation && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-xl font-bold mb-2">Detected Item: {detectedItem}</h3>
          <p>Do you want to add this item to the inventory?</p>
          <div className="flex space-x-4 mt-4">
            <button
              className="bg-green-500 text-black hover:bg-green-700 p-2 rounded"
              onClick={confirmItem}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 text-black hover:bg-red-700 p-2 rounded"
              onClick={cancelItem}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraClassifier;
