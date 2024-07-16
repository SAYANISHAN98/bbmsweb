import { BrowserRouter,Route, Router,Routes } from "react-router-dom";
import Login from "./project/login";
import Layout from "./project/layout";
import User from "./project/user";
import Stock from "./project/stock";
import Home from "./project/Home";
import Add from "./project/Form/Add/Add";
import Update from "./project/Form/update/Update";
import ViewDetail from "./project/ViewDetail";


function App() {
  return (
  
  
   
     <BrowserRouter>
    
      <Routes>
      <Route path="/ViewDetail" element={<ViewDetail />}/>
      <Route path="/Add" element={<Add />}/>
      <Route path="/Update" element={<Update />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Layout" element={<Layout/>}>
            <Route path="User" element={<User />}/>
            <Route path="Stock" element={<Stock />}/>

          </Route>
          
        
      </Routes>
      </BrowserRouter>
     
   


  );
}

export default App;
