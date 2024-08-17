// src/components/Header.jsx
import React from 'react';
import { FaUserCircle, FaBell } from 'react-icons/fa'; // Importing FontAwesome icons

function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-gray-800 text-white shadow-lg">
      <h1 className="text-4xl font-extrabold tracking-wide ml-4">PEOPLE.CO</h1>
      <div className="flex items-center">
        <FaBell className="text-2xl text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer mr-6" />
        <FaUserCircle className="text-3xl text-gray-300 hover:text-white transition duration-300 ease-in-out cursor-pointer mr-4" />
        <span className="text-xl font-medium">John Doe</span>
      </div>
    </header>
  );
}

export default Header;

