import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors , changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='border border-indigo-200 rounded-xl w-56 cursor-pointer group p-3 hover:shadow-lg transition-all duration-300'
            key={index}
          >
            <img
              className='w-full h-40 object-contain bg-indigo-50 group-hover:bg-primary transition-all duration-500'
              src={item.image}
              alt={item.name}
            />
            <p className='mt-2 font-semibold'>{item.name}</p>
            <p className='text-sm text-gray-600'>{item.speciality}</p>
            <div className='flex items-center gap-2 mt-2'>
              <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
              <p className='text-sm'>Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
