import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken , setAToken } = useContext(AdminContext)
  const {dToken , setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = ()=>{
    navigate('/')
    aToken  && setAToken('')
    aToken  && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken') 
  } 

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white shadow-sm'>
      <div className='flex items-center gap-3'>
        <img className='w-32 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="admin_logo" />
        <span className='px-3 py-1 rounded-full border border-gray-400 text-gray-700 text-xs sm:text-sm bg-gray-100'>
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button onClick={logout} className='text-sm font-medium text-white bg-primary px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-all'>
        Logout
      </button>
    </div>
  )
}

export default Navbar
