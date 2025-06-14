import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaEdit } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  if (!profileData) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6 bg-white rounded-2xl shadow-lg p-6">
        
        {/* Doctor Image */}
        <div className="sm:w-1/3 flex justify-center">
          <img
            src={profileData.image}
            alt="Doctor"
            className="rounded-xl w-48 h-48 object-cover shadow"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="mb-4 border-b pb-4">
            <h2 className="text-3xl font-semibold text-gray-800">{profileData.name}</h2>
            <div className="text-gray-600 flex gap-2 items-center mt-1">
              <p>{profileData.degree} • {profileData.speciality}</p>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {profileData.experience} yrs
              </span>
            </div>
          </div>

          {/* About */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">About</h4>
            <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
          </div>

          {/* Appointment Fees */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Appointment Fee</h4>
            <div className="text-gray-800 mt-1">
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  className="ml-2 px-2 py-1 border rounded-md w-28"
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                />
              ) : (
                <span className="ml-2 font-semibold">{profileData.fees}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <h4 className="font-medium text-gray-700">Address</h4>
            <div className="text-gray-600 text-sm mt-1">
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md"
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    placeholder="Line 1"
                  />
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md"
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    placeholder="Line 2"
                  />
                </div>
              ) : (
                <>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="available"
              checked={profileData.available}
              onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              className="w-4 h-4"
            />
            <label htmlFor="available" className="text-gray-700 text-sm">Available for appointments</label>
          </div>

          {/* Edit / Save Buttons */}
          <div className="flex gap-3">
            {isEdit ? (
              <>
                <button
                  onClick={updateProfile}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-full hover:bg-primary/90 transition"
                >
                  <FaCheckCircle /> Save
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                >
                  <MdOutlineCancel /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
              >
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile;
