import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';

import Login from './project/login';
import Finddonor from './project/Finddonor';
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
import Request from './project/Request'
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
// import Allrequest from './project/Allrequest';
import Chatbot from './project/Chatbot';
import Bloodcamp from './project/Bloodcamp';


function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
       
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/ViewDetail/:id" element={<ViewDetail />} />
                <Route path="/ViewDonor" element={<ViewDonor />} />
                <Route path="/Finddonor" element={<Finddonor />} />
                <Route path="/Add" element={<Add />} />
                 <Route path="/Update" element={<Update />} />
                
               <Route path="/Donate" element={<Donate/>} />
                <Route index element={<Home />} />
                <Route path="/Doner" element={<User />} />
                <Route path="/Request" element={<Request/>} />
                <Route path="/Completed" element={<Completed/>} />
                <Route path="/Accepted" element={<Accepted />} />
                {/* <Route path="/Allrequest" element={<Allrequest/>} /> */}
                <Route path="/Ongoing" element={<Ongoing/>} />
                <Route path="/Stock" element={<Stock />} />
                <Route path="/NewCamp" element={<NewCamp />} />
                <Route path="/Newtest" element={<Newtest />} />
                <Route path="/Bloodcamp" element={<Bloodcamp />} />
                <Route path="/Bloodtest" element={<Bloodtest />} />
                <Route path="/Viewbloodtest" element={<Viewbloodtest />} />
                <Route path="/Viewcamp" element={<Viewcamp />} />
                <Route path="/Bloodcampupdate" element={<Bloodcampupdate />} />
                <Route path="/Bloodtestupdate" element={<Bloodtestupdate />} />
               

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
