// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamMembers from './components/TeamMembers';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Overview from './components/Overview';

function App() {
  return (
      <div className="flex flex-col h-screen">
        <ToastContainer />
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/team-member" element={<TeamMembers />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;

