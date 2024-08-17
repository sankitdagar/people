import React, { useEffect, useState } from "react";
import {
  useGetMembersQuery,
  useDeleteMemberMutation,
} from "../feature/member/memberSlice";
import AddMemberForm from "./AddMemberForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMemberButton from "./AddMemberButton";

export default function TeamMembers() {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    email: "",
    team: "",
    role: "",
  });
  const [deleteMember, { isSuccess, isError }] = useDeleteMemberMutation();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { data: memberList, refetch } = useGetMembersQuery(filters);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Member deleted successfully");
      refetch();
    } else if (isError) {
      toast.error("Failed to delete member");
    }
  }, [isSuccess, isError, refetch]);

  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMember) {
      await deleteMember(selectedMember._id);
      setShowDeletePopup(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowEditForm(false);
    setSelectedMember(null);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-4 ">
        <ToastContainer />
        {/* Filters Section */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-64"
            onChange={handleInput}
            name="name"
          />
          <input
            type="text"
            placeholder="Search by email"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-64"
            onChange={handleInput}
            name="email"
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 w-64"
            onChange={handleInput}
            name="role"
          >
            <option value="">Select role</option>
            <option value="Product_Designer">Product Designer</option>
            <option value="Product_Manager">Product Manager</option>
            <option value="Frontend_Developer">Frontend Developer</option>
            <option value="Backend_Developer">Backend Developer</option>
          </select>
          <div className="mt-3 w-[26%]">
            <AddMemberButton />
          </div>
        </div>

        {/* Members Table */}
        <div className="overflow-hidden shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Teams
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {memberList?.length > 0 ? (
                memberList.map((member, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                      <img
                        src={member?.profilePic}
                        alt={member?.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {
                        member.role
                          .split("_") // Split the string by underscores
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          ) // Capitalize the first letter of each word
                          .join(" ") // Join the words back together with spaces
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 mr-2 rounded-full text-xs font-medium">
                          {member?.teams}
                        </span>
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(member)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <i className="fa fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(member)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Popup */}
        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold">Confirm Delete</h2>
              <p className="mt-2">
                Are you sure you want to delete {selectedMember.name}?
              </p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form Popup */}
        {showEditForm && (
          <AddMemberForm
            refetchOnAryChange={refetch}
            onClose={handleCloseForm}
            initialData={selectedMember}
          />
        )}
      </div>
    </>
  );
}
