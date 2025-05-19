import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FaUserEdit } from 'react-icons/fa';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Anand Kharane",
    image: assets.profile_pic,
    email: 'kharaneanand@gmail.com',
    phone: '8767309278',
    address: {
      line1: "57th Cross, Church Road, Nanded City",
      line2: "Pune, Maharashtra, India"
    },
    gender: "Male",
    DOB: '2004-10-28'
  });

  const [isEdit, setIsEdit] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    console.log("Saved data:", userData);
    setIsEdit(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10  mb-10 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
           <h1 className="text-3xl font-bold text-gray-800"> My Profile</h1>
        </div>
       
        <p className="text-gray-500 text-sm">Manage your personal details</p>
      </div>

      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <img
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-100"
          src={userData.image}
          alt="User"
        />
        {
          isEdit ? (
            <input
              className="text-xl font-semibold text-center text-gray-800 border-b-2 border-blue-300 p-1 focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">{userData.name}</h2>
          )
        }
      </div>

      {/* Contact Info */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-blue-600 border-b pb-1 mb-4">📞 Contact Information</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex gap-2">
            <span className="font-medium w-24">Email:</span>
            <span className="text-blue-500">{userData.email}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium w-24">Phone:</span>
            {
              isEdit ? (
                <input
                  className="bg-gray-100 rounded px-2 py-1 w-full"
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <span className="text-blue-500">{userData.phone}</span>
              )
            }
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-medium w-24">Address:</span>
            {
              isEdit ? (
                <div className="space-y-1 w-full">
                  <input
                    className="bg-gray-100 rounded px-2 py-1 w-full"
                    value={userData.address.line1}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                  />
                  <input
                    className="bg-gray-100 rounded px-2 py-1 w-full"
                    value={userData.address.line2}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                  />
                </div>
              ) : (
                <span>{userData.address.line1}<br />{userData.address.line2}</span>
              )
            }
          </div>
        </div>
      </section>

      {/* Basic Info */}
      <section>
        <h3 className="text-lg font-semibold text-blue-600 border-b pb-1 mb-4">📋 Basic Information</h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex gap-2 items-center">
            <span className="font-medium w-24">Gender:</span>
            {
              isEdit ? (
                <select
                  className="bg-gray-100 rounded px-2 py-1"
                  value={userData.gender}
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span>{userData.gender}</span>
              )
            }
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium w-24">Birthday:</span>
            {
              isEdit ? (
                <input
                  className="bg-gray-100 rounded px-2 py-1"
                  type="date"
                  value={userData.DOB}
                  onChange={(e) => setUserData(prev => ({ ...prev, DOB: e.target.value }))}
                />
              ) : (
                <span>{userData.DOB}</span>
              )
            }
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-center mt-10 gap-4">
        {
          isEdit ? (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-2 rounded-full shadow-md hover:scale-105 transition"
            >
              Edit Profile
            </button>
          )
        }
      </div>

      {/* Success Message */}
      {showSaved && (
        <p className="text-green-600 text-center mt-4 animate-bounce">✅ Profile updated!</p>
      )}
    </div>
  );
};

export default MyProfile;
