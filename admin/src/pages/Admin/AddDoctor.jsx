import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
 
  const [docImg , setDocImg] = useState(false)
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [experience , setExperience] = useState('1 Year')
  const [fees , setFees] = useState('')
  const [about , setAbout] = useState('')
  const [Speciality , setSpeciality] = useState('General Physician')
  const [degree , setDegree] = useState('')
  const [address1 , setAddress1] = useState('')
  const [address2 , setAddress2] = useState('')




  return (
    <form className='m-5 w-full' action="">
  <p className='mb-6 text-2xl font-semibold text-gray-800'>Add Doctor</p>

  <div className='bg-white px-10 py-10 border rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-md'>

    {/* Upload section */}
    <div className='flex items-center gap-6 mb-10 text-gray-600'>
      <label htmlFor="doc-img" className='cursor-pointer'>
        <img className='w-20 h-20 object-cover bg-gray-100 border-2 border-dashed border-gray-300 rounded-full hover:scale-105 transition-transform' 
             src= { docImg? URL.createObjectURL(docImg) : assets.upload_area} 
             alt="upload_img" />
      </label>
      <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
      <p className='text-sm text-gray-500'>
        <span className='font-medium text-gray-700'>Upload Doctor</span><br />
        Picture
      </p>
    </div>

    {/* Two-column layout */}
    <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-700'>

      {/* Column 1 */}
      <div className='w-full lg:flex-1 flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Doctor Name</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="text" placeholder='Name' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Doctor Email</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="email" placeholder='Email' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Doctor Password</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="password" placeholder='Password' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Experience</p>
          <select className='border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50'>
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="5 Year">5 Year</option>
            <option value="6 Year">6 Year</option>
            <option value="7 Year">7 Year</option>
            <option value="8 Year">8 Year</option>
            <option value="9 Year">9 Year</option>
            <option value="10 Year">10 Year</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Fees</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="number" placeholder='Fees' required />
        </div>
      </div>

      {/* Column 2 */}
      <div className='w-full lg:flex-1 flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Speciality</p>
          <select className='border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50'>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Education</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="text" placeholder='Education' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>Address</p>
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="text" placeholder='Address 1' required />
          <input className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50' type="text" placeholder='Address 2' required />
        </div>
      </div>
    </div>

    <div className='mt-6'>
      <p className='mb-2 text-sm font-medium'>About Doctor</p>
      <textarea className='w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50' placeholder='Write about the doctor' rows={5} required />
    </div>

    <button className='bg-primary hover:bg-primary/90 px-10 py-3 mt-6 text-white font-semibold rounded-full transition-all duration-300 shadow-sm'>
      Add Doctor
    </button>
  </div>
</form>
  )
}

export default AddDoctor
