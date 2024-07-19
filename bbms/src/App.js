import { BrowserRouter,Route, Router,Routes } from "react-router-dom";
import Login from "./project/login";
import Layout from "./project/layout";
import User from "./project/user";
import Stock from "./project/stock";
import Home from "./project/Home";
import Add from "./project/Form/Add/Add";
import Update from "./project/Form/update/Update";
import ViewDetail from "./project/ViewDetail";
import Notfound from "./Notfound";


function App() {
  return (
  
  
   
     <BrowserRouter>
    
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/ViewDetail" element={<ViewDetail />}/>
      <Route path="/Add" element={<Add />}/>
      <Route path="/Update" element={<Update />}/>
      <Route index element={<Home />}/>
          <Route path="/Login" element={<Login />}/>
    
            <Route path="/user" element={<User />}/>
            <Route path="Stock" element={<Stock />}/>
            <Route path='*' element={<Notfound/>}/>
            </Route>

          
          
        
      </Routes>
      </BrowserRouter>
     
   


  );
}

export default App;
