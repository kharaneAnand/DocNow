import React from 'react'
import { assets } from '../assets/assets'
import { Mail, Phone, MapPin } from 'lucide-react'

const Contacts = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-16">
      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          CONTACT <span className="text-indigo-600">US</span>
        </h2>
        <div className="w-20 h-1 bg-indigo-600 rounded-full mx-auto mt-3 mb-10" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-6 sm:p-10 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-indigo-300">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              className="w-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              src={assets.contact_image}
              alt="Contact"
            />
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-700 text-base">
            {/* Office Info */}
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin className="text-indigo-600" size={20} />
                Our Office
              </p>
              <p className="leading-relaxed text-gray-600 ml-1">
                431603 HallaBol Station<br />
                Nanded City, Pune, Maharashtra, India
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Phone className="text-green-600" size={20} />
                Contact
              </p>
              <p className="ml-1 text-gray-600">Tel: (415) 555-01234</p>
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Mail className="text-red-500" size={20} />
                Email
              </p>
              <a
                href="mailto:kharaneanand@gmail.com"
                className="ml-1 text-indigo-600 hover:underline hover:text-indigo-800 transition"
              >
                kharaneanand@gmail.com
              </a>
            </div>

            {/* Developer & Team */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-lg font-medium hover:text-indigo-600 cursor-pointer transition">
                Learn more about our Team →
              </p>
              <p className="text-lg font-medium mt-2 text-indigo-700">
                Developed By <span className="font-extrabold text-indigo-900">Anand Kharane</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts;
