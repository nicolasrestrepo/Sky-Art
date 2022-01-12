
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// Layout
import MainLayout from './layouts/main'
// pages
import Home from './pages/home';
import Detail from './pages/detail';
import Mint from './pages/mint';

function App() {
  
  return (    
    <MainLayout>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/assets/:tokenId" element={<Detail />} />
            <Route path="/mint" element={<Mint />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
