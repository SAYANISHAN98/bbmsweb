import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/privateRoute';  // Import PrivateRoute
import PublicRoute from './routes/publicRoute';    // Import PublicRoute

import Login from './project/login';
import Finddonor from './project/Finddonor';
import Doner from './project/Doner';
import Layout from './layout';
import User from './project/Doner';
import Stock from './project/stock';
import Home from './project/Home';
import Add from './project/Form/Add';
import Update from './project/Form/Update';
import ViewDetail from './project/ViewDetail';
import ViewDonor from './project/ViewDonor';
import Notfound from './Notfound';
import QueryProvider from './providers/Queryprovider';
import Donate from './project/Form/Donate';
import Request from './project/Request';
import Completed from './project/Completed';
import Ongoing from './project/Ongoing';
import Accepted from './project/Accepted';

import NewCamp from './project/Form/NewCamp';
import Newtest from './project/Form/Newtest';
import Bloodcamp from './project/Bloodcamp';
import Bloodtest from './project/bloodtest';
import Viewbloodtest from './project/Viewbloodtest';
import Viewcamp from './project/Viewcamp';
import Bloodcampupdate from './project/Bloodcampupdate';
import Bloodtestupdate from './project/Bloodtestupdate';
import Chatbot from './project/Chatbot';

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
            {/* Protected Routes wrapped in PrivateRoute */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/ViewDetail/:id" element={<ViewDetail />} />
                <Route path="/ViewDonor" element={<ViewDonor />} />
                <Route path="/Finddonor" element={<Finddonor />} />
                <Route path="/Add" element={<Add />} />
                <Route path="/Form/Update/:id" element={<Update />} />
                <Route path="/Donate/:id" element={<Donate />} />
                <Route index element={<Home />} />
                <Route path="/Doner" element={<Doner />} />
                <Route path="/Request" element={<Request />} />
                <Route path="/Completed" element={<Completed />} />
                <Route path="/Accepted" element={<Accepted />} />
                <Route path="/Ongoing" element={<Ongoing />} />
                <Route path="/Stock" element={<Stock />} />
                <Route path="/Chatbot" element={<Chatbot />} />
                <Route path="/NewCamp" element={<NewCamp />} />
                <Route path="/Newtest" element={<Newtest />} />
                <Route path="/Bloodcamp" element={<Bloodcamp />} />
                <Route path="/Bloodtest" element={<Bloodtest />} />
                <Route path="/Viewbloodtest" element={<Viewbloodtest />} />
                <Route path="/Viewcamp/:id" element={<Viewcamp />} />
                <Route path="/Bloodcampupdate/:id" element={<Bloodcampupdate />} />
                <Route path="/Bloodtestupdate" element={<Bloodtestupdate />} />
                <Route path="*" element={<Notfound />} />
              </Route>
            </Route>

            {/* Public Route for Login */}
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
