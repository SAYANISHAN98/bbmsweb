// index.js (located in project-root)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './bbms/src/App';  // Adjust this path if necessary

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

