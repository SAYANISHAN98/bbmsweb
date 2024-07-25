import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';

import Login from './project/login';
import Layout from './layout';
import User from './project/Doner';
import Stock from './project/stock';
import Home from './project/Home';
import Add from './project/Form/Add/Add';
import Update from './project/Form/update/Update';
import ViewDetail from './project/ViewDetail';
import Notfound from './Notfound';
import QueryProvider from './providers/Queryprovider';

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
       
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/ViewDetail" element={<ViewDetail />} />
                <Route path="/Add" element={<Add />} />
                <Route path="/Update" element={<Update />} />
                <Route index element={<Home />} />
                <Route path="/Doner" element={<User />} />
                <Route path="/Stock" element={<Stock />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </Route>

           
            <Route path="/login" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
