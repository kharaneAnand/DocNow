import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import cancel_icon from '../../assets/cancel_icon.svg'  // or .png/.jpg

const AllAPointments = () => {
  const { aToken, appointments, getAllApointments  , cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllApointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700 bg-gray-50'>
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
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50'
            >
              {/* Index */}
              <p className='max-sm:hidden'>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 h-8 rounded-full object-cover'
                  src={item?.userId?.image || 'https://via.placeholder.com/40'}
                  alt="patient"
                />
                <p>{item?.userId?.name || 'Unknown'}</p>
              </div>

              {/* Age */}
             <p className='max-sm:hidden'>
                {console.log('DOB:', item?.userId?.dob)} {/* Add this */}
                {item?.userId?.dob ? calculateAge(item.userId.dob) : '-'}
             </p>


              {/* Date & Time */}
              <p>
                {item?.slotDate ? slotDateFormat(item.slotDate) : '-'} , {item?.slotTime || '-'}
              </p>

              {/* Doctor Info */}
              <div className='flex items-center gap-2'>
                <img
                  className='w-8 h-8 rounded-full object-cover bg-gray-200'
                  src={item?.docId?.image || 'https://via.placeholder.com/40'}
                  alt="doctor"
                />
                <p>{item?.docId?.name || 'Unknown'}</p>
              </div>

              {/* Fees */}
              <p>{currency}{item?.amount || '0'}</p>

              {/* Action */}
              {
                item.cancelled 
                ? <p className='text-red-400  text-xs font-medium'>Cancelled</p>
                : <img
                className='w-6 h-6 cursor-pointer'
                src={cancel_icon}
                alt="Cancel"
                title="Cancel Appointment"
                 onClick={()=>cancelAppointment(item._id)}
              />
              }
              
            </div>
          ))
        ) : (
          <div className='text-center py-10 text-gray-400'>
            No appointments found or loading...
          </div>
        )}
      </div>
    </div>
  )
}

export default AllAPointments
