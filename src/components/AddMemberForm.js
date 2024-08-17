// src/AddMemberForm.jsx
import React, { useEffect, useState } from 'react';
import { useAddMemberMutation, useEditMemberMutation } from '../feature/member/memberSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMemberForm({ onClose, initialData, refetchOnAryChange }) {
  const [addMember, { isSuccess: isAddSuccess, isError: isAddError, isLoading }] = useAddMemberMutation();
  const [updateMember, { isSuccess: isUpdateSuccess, isError: isUpdateError, isLoading: isUpdateLoading }] = useEditMemberMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
    profilePic: null,
    teams: ''
  });
  const [preview, setPreview] = useState(null);
  console.log(formData)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
        profilePic: initialData.profilePic,
        teams: initialData.teams
      });
      if (initialData.profilePic) {
        setPreview(initialData.profilePic);
      }
    }
  }, [initialData]);

  useEffect(() => {
    if (isAddSuccess) {
      toast.success('Member added successfully');
      window.location.reload();
      onClose();
    }
    else if(isLoading){
      toast.loading('...Loading');
    } else if (isAddError) {
      toast.error('Failed to add member');
    }
  }, [isAddSuccess, isAddError, onClose, isLoading]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success('Member updated successfully');
      refetchOnAryChange();
      onClose();
    }
    else if(isUpdateLoading){
      toast.loading('...Loading');
    } 
    else if (isUpdateError) {
      toast.error('Failed to update member');
    }
  }, [isUpdateSuccess, isUpdateError, refetchOnAryChange, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
  };

  const handleFileChange = (event) => {
    // Declare object1Url within the function scope
    const object1Url = URL.createObjectURL(event?.target?.files[0]);
    
    setFormData((preData) => ({
      ...preData,
      profilePic: event?.target?.files[0],
    }));
  
    setPreview(object1Url);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('role', formData.role);
    form.append('status', formData.status);
    form.append('teams', formData.teams);
    if (formData.profilePic) {
      form.append('profilePic', formData.profilePic);
    }

    if (initialData) {
      updateMember({ id: initialData._id, rest: form });
    } else {
      addMember(form);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40%]">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Member" : "Add Member"}
        </h2>
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                <i className="fa fa-user text-4xl"></i>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="w-1/2 px-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-1/2 px-2">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Role</option>
                <option value="Product_Designer">Product Designer</option>
                <option value="Product_Manager">Product Manager</option>
                <option value="Frontend_Developer">Frontend Developer</option>
                <option value="Backend_Developer">Backend Developer</option>
            </select>
            </div>
            <div className="w-1/2 px-2">
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Team</label>
            <select
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select team</option>
              <option value="Design">Designe</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
