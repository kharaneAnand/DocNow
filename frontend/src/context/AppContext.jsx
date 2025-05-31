import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Step 1: Create the context
export const AppContext = createContext();

// Step 2: Create the Provider component
const AppContextProvider = ({ children }) => {

  const currencySymbol = '₹';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log('Backend URL:', backendUrl);


  // Initialize token as null if not present
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState({});

  // Get doctors data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load user profile data if token exists
  const loadUserProfileData = async () => {
    if (!token) return; // safety check

    try {
      const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
        headers: { token }
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
        // If unauthorized, clear token and userData
        if (data.message.toLowerCase().includes('not authorized')) {
          setToken(null);
          localStorage.removeItem('token');
          setUserData({});
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Save token to state and localStorage
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Remove token on logout
  const clearToken = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUserData({});
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData({});
    }
  }, [token]);

  const value = {
    doctors, getDoctorsData , 
    currencySymbol,
    token,
    setToken: saveToken,
    clearToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
