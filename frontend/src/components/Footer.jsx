import React from 'react'
import { assets } from '../assets/assets'
import { PhoneIcon,EnvelopeIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm '>
        {/**----left section ------- */}
        <div>
            <img className='mb-0.5 w-40'src={assets.logo} alt="logo of DocNow" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>
               DocNow is a trusted platform for booking doctor appointments online, connecting you with verified healthcare professionals across India anytime, anywhere.
            </p>
        </div>

        {/**-----center section----------- */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us </li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        {/**------right section----------- */}
        <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul  className='flex flex-col gap-2 text-gray-600'>
                <li className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-gray-600" />
                  (+91)9875115510
                </li>
                 <li className="flex items-center gap-2">
                 <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                  support@docnow.in
                </li>
            </ul>
        </div>
        </div>
         
         
    </div>
  )
}

export default Footer