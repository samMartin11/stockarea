import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; 

import WarehouseList from "./Components/WarehouseList"; 
 import WarehouseDetails from './Components/WarehouseDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/warehouse/:id" element={<WarehouseDetails/>} />
        <Route path="*"element={<div>PAGE NOT FOUND</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
// First start the json server then start the local server...
