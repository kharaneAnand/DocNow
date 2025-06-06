import { useState, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: { dToken }
      });

      if (data.success) {
        setAppointments([...data.appointments].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Update both appointments list and dashboard data
        setAppointments(prev =>
          prev.map(a => a._id === appointmentId ? { ...a, isCompleted: true } : a)
        );
        // Refresh dashboard data to reflect changes
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Update both appointments list and dashboard data
        setAppointments(prev =>
          prev.map(a => a._id === appointmentId ? { ...a, cancelled: true } : a)
        );
        // Update dashboard data
        setDashData(prev => prev ? {
          ...prev,
          latestAppointments: prev.latestAppointments.map(a => 
            a._id === appointmentId ? { ...a, cancelled: true } : a
          )
        } : null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/dashboard`, {}, {
        headers: { dToken }
      });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment, 
    cancelAppointment,
    dashData,
    setDashData,
    getDashData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;