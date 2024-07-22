// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './bbms/src/App.js';  // Adjust the path if necessary

// Create a root element
const rootElement = document.getElementById('root');

// Render the App component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
