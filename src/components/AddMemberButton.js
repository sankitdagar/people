// src/AddMemberButton.jsx
import React, { useState } from 'react';
import AddMemberForm from './AddMemberForm';

export default function AddMemberButton() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative"/>
        <button
          onClick={handleOpenForm}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 focus:ring focus:ring-purple-300"
        >
          + Add Member
        </button>
      </div>

      {isFormVisible && <AddMemberForm onClose={handleCloseForm} />}
    </div>
  );
}
