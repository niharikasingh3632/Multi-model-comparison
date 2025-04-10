import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Make sure this is correct
import UserLayout from './Components/Layout/UserLayout';
import { Toaster } from "sonner"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top right" />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          { /* User Layout*/}
          <Route index element={<Home />} />
        </Route>
        <Route>{ /* Admin Layout*/}</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App