import React, { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios'
import {toast} from 'react-toastify'

// Step 1: Create the context
export const AppContext = createContext();

// Step 2: Create the Provider component
const AppContextProvider = ({ children }) => {

  const currencySymbol = '₹' 
  const backendurl = import.meta.env.VITE_BACKEND_URL
  const [doctors , setDoctors] = useState([])

  const value = { 
    doctors ,
    currencySymbol
   };

   const getDoctorsData = async()=>{
    try {

      const {data} = await axios.get(backendurl+'/api/doctor/list')
      if(data.success){
          setDoctors(data.doctors)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

   useEffect(()=>{
      getDoctorsData()
   },[])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
