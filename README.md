# Inventory Management App

## Overview

This is a full-stack Inventory Management application built using **Next.js** (frontend), **Firebase** (backend), and **Material-UI** for UI components. The application provides functionalities to add, update, and manage inventory items seamlessly. It includes an image classification feature to detect objects from uploaded images and automatically adjust inventory counts.

## Key Features

- **Inventory Management**: Add, edit, delete, and view inventory items.
- **Image Classification**: Uses a pre-trained **MobileNetV2** model to detect objects in images and adjust inventory counts automatically.
- **Real-time Database**: Integrates with Firebase to handle real-time updates and data storage.
- **Authentication**: Firebase Authentication for secure login and user management.
- **UI Components**: Responsive and clean UI built using Material-UI.
- **Scalability**: Designed to handle large inventories and real-time updates efficiently.

## Technologies Used

- **Next.js**: For building the frontend.
- **Firebase**: For backend services (Firestore for data storage and Firebase Authentication).
- **Material-UI**: For the UI components.
- **MobileNetV2**: A machine learning model for image classification.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jdurairaj-hub/inventory-management-app.git
   cd inventory-management-app

2. Install the dependencies:
   ```bash
   npm install

3. Start the  development server:
   ```bash
   npm run dev

4. The app will be running on **http://localhost:3000**

## Usage

- **Login/Signup**: Authenticate using your Firebase credentials.
- **Add Inventory**: Click on "Add Item" to input new inventory data.
- **Image Classification**: Upload an image, and the app will automatically check if the object exists in the inventory and update the count.
- **Manage Inventory**: View, update, and delete inventory items from the dashboard.

## Image Classification

This app uses the **MobileNetV2** pre-trained model to classify objects from images. If the object in the image exists in the inventory, the app updates the quantity. Otherwise, a new inventory item is created.

## Contributing

If you'd like to contribute, feel free to fork the repository and make pull requests. Please ensure all changes are well documented.

## License

This project is licensed under the MIT License.
