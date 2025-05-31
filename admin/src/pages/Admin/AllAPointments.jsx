import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import cancel_icon from '../../assets/cancel_icon.svg'  

const AllAPointments = () => {
  const { aToken, appointments, getAllApointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllApointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-7xl mx-auto p-5'>

      <p className='mb-6 text-2xl font-semibold text-gray-800 border-b pb-3'>
        All Appointments
      </p>

      <div className='bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh] min-h-[60vh]'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-4 px-6 border-b text-gray-600 bg-gradient-to-r from-blue-50 to-blue-100 font-semibold tracking-wide uppercase select-none'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {appointments?.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-4 py-4 px-6 border-b last:border-none hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer'
            >
              {/* Index */}
              <p className='max-sm:hidden text-gray-500 font-semibold'>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover border-2 border-blue-300 shadow-sm'
                  src={item?.userId?.image || 'https://via.placeholder.com/40'}
                  alt="patient"
                />
                <p className='font-medium text-gray-800'>{item?.userId?.name || 'Unknown'}</p>
              </div>

              {/* Age */}
              <p className='max-sm:hidden text-gray-600 font-medium'>
                {item?.userId?.dob ? calculateAge(item.userId.dob) : '-'}
              </p>

              {/* Date & Time */}
              <p className='text-gray-700 font-medium'>
                {item?.slotDate ? slotDateFormat(item.slotDate) : '-'} , {item?.slotTime || '-'}
              </p>

              {/* Doctor Info */}
              <div className='flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover border-2 border-green-300 shadow-sm'
                  src={item?.docId?.image || 'https://via.placeholder.com/40'}
                  alt="doctor"
                />
                <p className='font-medium text-gray-800'>{item?.docId?.name || 'Unknown'}</p>
              </div>

              {/* Fees */}
              <p className='font-semibold text-gray-900'>{currency}{item?.amount || '0'}</p>

              {/* Action */}
              {item.cancelled ? (
                <p className='text-red-500 text-xs font-semibold italic tracking-wide select-none'>Cancelled</p>
              ) : (
                <img
                  className='w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity'
                  src={cancel_icon}
                  alt="Cancel"
                  title="Cancel Appointment"
                  onClick={() => cancelAppointment(item._id)}
                />
              )}
            </div>
          ))
        ) : (
          <div className='text-center py-12 text-gray-400 italic select-none'>
            No appointments found or loading...
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAPointments
