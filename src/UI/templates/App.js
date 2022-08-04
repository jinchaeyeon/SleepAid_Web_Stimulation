import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from '../organisms/Header/Header';
import Sidebar from '../organisms/Sidebar/Sidebar';
import MainPage from '../pages/MainPage/MainPage';
import './App.css'

const App = () => {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Sidebar />
          <Header sx={{ marginBottom: 10 }} />
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;