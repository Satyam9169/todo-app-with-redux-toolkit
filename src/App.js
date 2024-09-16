import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navigation from './component/Navigation/Navigation'
import Create from "./component/Create/Create";
import Read from "./component/Read/Read"
import Update from './component/Update/Update'


const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit/:id" element={<Update />} />
      </Routes>
    </div>
  );
};

export default App;

