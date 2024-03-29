import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from "./componnents/Navbar"
import Footer from './componnents/Footer';
import Main from './componnents/Main';
import Login from './componnents/Login';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatHistory from './componnents/ChatHistory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/history" element={<ChatHistory />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
