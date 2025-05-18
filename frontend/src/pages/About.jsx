import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        
        <div className="text-center pt-10">
            <p className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">
                  ABOUT <span className="text-blue-600">US</span>
            </p>
            <div className="mt-2 w-20 h-1 mx-auto bg-blue-600 rounded-full"></div>
            <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
                  Learn more about who we are, our mission, and what drives us to make healthcare more accessible and efficient.
            </p>
        </div>


    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12 my-10 p-6 border border-gray-200 rounded-2xl shadow-lg bg-white">
          <img
            className="w-full md:max-w-[360px] object-cover rounded-xl shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 animate-fade-in-up"
            src={assets.about_image}
            alt="About Us"
          />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700">
            <div>
              <p className="text-xl font-semibold text-black mb-1 border-l-4 border-blue-500 pl-3">Who We Are</p>
              <p className="text-sm">
                We are a passionate team of developers and healthcare professionals dedicated to bridging the gap between patients and doctors through technology. Our platform offers a seamless, efficient, and reliable way for patients to book appointments with trusted healthcare providers across India.
              </p>
            </div>
        
            <div>
              <p className="text-xl font-semibold text-black mb-1 border-l-4 border-green-500 pl-3">Our Mission</p>
              <p className="text-sm">
                Our mission is to simplify healthcare access for everyone. We aim to empower patients with the tools to find the right doctors at the right time while helping doctors manage their appointments with ease and efficiency.
              </p>
            </div>
            
            <div>
              <p className="text-xl font-semibold text-black mb-1 border-l-4 border-purple-500 pl-3">Our Vision</p>
              <p className="text-sm">
                We envision a future where access to quality healthcare is just a click away for every Indian, regardless of location or background. By leveraging modern technology, we strive to make healthcare smarter, faster, and more accessible.
              </p>
            </div>
    </div>
    </div>


       <div className="text-center my-10">
          <p className="text-3xl font-bold text-gray-700 tracking-wide">
            WHY <span className="text-blue-600">CHOOSE US</span>
          </p>
          <div className="mt-2 w-24 h-1 mx-auto bg-blue-600 rounded-full"></div>
        </div>

    <div className="flex flex-col md:flex-row gap-6 mb-20 px-4">
        {/* Efficiency */}
        <div className="flex-1 border rounded-xl p-8 md:p-10 bg-white hover:bg-primary hover:text-white hover:font-bold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer text-center">
        <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
          <p className="text-sm">
            Streamlined appointment scheduling that fits into your busy lifestyle.
          </p>
        </div>

        {/* Convenience */}
        <div className="flex-1 border rounded-xl p-8 md:p-10 bg-white hover:bg-primary hover:text-white hover:font-bold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer text-center">
          <div className="text-3xl mb-4">🏥</div>
          <h3 className="text-lg font-semibold mb-2">Convenience</h3>
          <p className="text-sm">
            Access to a network of trusted healthcare professionals in your area.
          </p>
        </div>

        {/* Personalization */}
        <div className="flex-1 border rounded-xl p-8 md:p-10 bg-white hover:bg-primary hover:text-white hover:font-bold transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Personalization</h3>
           <p className="text-sm">
            Tailored recommendations and reminders to help you stay on top of your health.
          </p>
        </div>
    </div>

    </div>
  )
}

export default About