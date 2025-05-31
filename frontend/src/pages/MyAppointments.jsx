import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [ ' ','Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' ,'Nov' , 'Dec']

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_') 
    return dateArray[0]+" " + months[Number(dateArray[1])]+" " + dateArray[2]
  }


  const getUserAppointments = async () => {
    try {
      console.log("Fetching appointments from:", backendUrl);
      console.log("Token:", token);

      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });

      console.log("Appointments API response:", data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error("Failed to fetch appointments");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  const cancelAppointment = async(appointmentId)=>{

    try {

      console.log(appointmentId);
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId} , {headers:{token}})
      
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
       console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUserAppointments();
  }, [token]);

  return (
    <div className="px-4">
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.length === 0 ? (
          <p className='text-gray-500 mt-4'>No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            item.docId && (
              <div key={index} className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
                <div>
                  <img className='w-32 h-32' src={item.docId.image} alt="Doc Img" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.docId.name}</p>
                  <p>{item.docId.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>Address :-</p>
                  <p className='text-xs'>{item.docId.address?.line1}</p>
                  <p className='text-xs'>{item.docId.address?.line2}</p>
                  <p className='text-xs mt-1'>
                    <span className='text-sm font-medium'>Date & Time :-</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div className='flex flex-col gap-2 justify-end'>
                 {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-green-500 hover:text-white transition-all duration-300'>Pay Online</button> } 
                {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button> }  
                {item.cancelled && <button className='sm:min-w-48 py-2 border  border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
