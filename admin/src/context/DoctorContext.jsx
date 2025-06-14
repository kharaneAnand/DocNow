import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Named export for context (must be consistent)
export const DoctorContext = createContext();

// Default export must be a component for Vite HMR
const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(false);

  // Helper: Axios headers with token
  const authHeader = {
    headers: {
      dToken, // or use Authorization: `Bearer ${dToken}` if your backend expects it
    },
  };

  // Fetch doctor appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, authHeader);
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

  // Mark appointment as completed
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        authHeader
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.map((a) => (a._id === appointmentId ? { ...a, isCompleted: true } : a))
        );
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        authHeader
      );
      if (data.success) {
        toast.success(data.message);

        setAppointments((prev) =>
          prev.map((a) => (a._id === appointmentId ? { ...a, cancelled: true } : a))
        );

        setDashData((prev) =>
          prev
            ? {
                ...prev,
                latestAppointments: prev.latestAppointments.map((a) =>
                  a._id === appointmentId ? { ...a, cancelled: true } : a
                ),
              }
            : null
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/dashboard`, {}, authHeader);
      if (data.success) {
        setDashData(data.dashData);
        console.log("✅ Dashboard data:", data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Dashboard fetch failed:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  // Fetch doctor's profile info
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, authHeader);
      if (data.success) {
        setProfileData(data.profileData);
        console.log("✅ Doctor profile data:", data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Expose all context values
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
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
