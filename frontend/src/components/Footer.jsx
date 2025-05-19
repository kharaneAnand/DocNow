import React from 'react';
import { assets } from '../assets/assets';
import { Mail, Phone, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white px-6 md:px-20 lg:px-40 py-20 rounded-t-3xl shadow-inner">
      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-gray-700">
        {/* Left: About */}
        <div>
          <img className="w-40 mb-4" src={assets.logo} alt="DocNow Logo" />
          <p className="text-sm text-gray-600 leading-snug max-w-sm">
            <span className="font-bold text-gray-800">DocNow</span> is your reliable platform for online doctor consultations. Connect with certified healthcare experts from the comfort of your home.
          </p>
        </div>

        {/* Center: Navigation */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2 text-gray-600 text-[15px]">
            <li
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 group hover:text-indigo-600 transition-all cursor-pointer"
            >
              <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-all" />
              Home
            </li>
            <li
              onClick={() => handleNavigation('/about')}
              className="flex items-center gap-2 group hover:text-indigo-600 transition-all cursor-pointer"
            >
              <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-all" />
              About Us
            </li>
            <li
              onClick={() => handleNavigation('/contacts')}
              className="flex items-center gap-2 group hover:text-indigo-600 transition-all cursor-pointer"
            >
              <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-all" />
              Contact Us
            </li>
            <li
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2 group hover:text-indigo-600 transition-all cursor-pointer"
            >
              <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-all" />
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <div className="flex items-center gap-3 mb-3">
            <Phone className="text-green-600" size={18} />
            <span className="text-gray-600 text-[15px]">(+91)8767309278</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-red-500" size={18} />
            <a
              href="mailto:kharaneanand@gmail.com"
              className="text-gray-600 text-[15px] hover:underline hover:text-indigo-800 transition"
            >
              kharaneanand@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-12">
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-200 via-slate-300 to-indigo-200 mb-6" />
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700">DocNow</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
