// src/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r">
      <div className="py-8 px-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="block font-bold text-xl">Dashboard</span>
          </div>
        </div>
        <div className="mt-10">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/overview"
                exact
                activeClassName="bg-purple-100 text-purple-700"
                className="flex items-center text-base font-semibold text-gray-900 hover:text-purple-700 hover:bg-purple-100 transition-colors duration-200 rounded-lg p-2"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 text-purple-700 bg-gray-200 rounded-lg">
                  <i className="fa fa-cube"></i>
                </span>
                <span className="ml-4">Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/team-member"
                activeClassName="bg-purple-100 text-purple-700"
                className="flex items-center text-base font-semibold text-gray-900 hover:text-purple-700 hover:bg-purple-100 transition-colors duration-200 rounded-lg p-2"
              >
                <span className="inline-flex items-center justify-center h-8 w-8 text-purple-700 bg-purple-200 rounded-lg">
                  <i className="fa fa-address-book"></i>
                </span>
                <span className="ml-4">People Directory</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
