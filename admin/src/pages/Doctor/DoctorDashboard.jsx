import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dashData, dToken, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // Helper function to format date and time
  const parseDateTime = (slotDate, slotTime) => {
    try {
      // Parse slotDate format: "4_6_2025" (day_month_year)
      const [day, month, year] = slotDate.split('_');
      
      // Parse slotTime format: "11:00 AM"
      const [time, period] = slotTime.split(' ');
      const [hours, minutes] = time.split(':');
      
      let hour24 = parseInt(hours);
      if (period === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hour24 === 12) {
        hour24 = 0;
      }
      
      // Create date object (month is 0-indexed in JavaScript)
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), hour24, parseInt(minutes));
      
      return dateObj;
    } catch (error) {
      console.error('Error parsing date:', error);
      return new Date(); // Return current date as fallback
    }
  };

  if (!dashData) {
    return <div className="text-center py-20 text-gray-400 italic">Loading dashboard...</div>;
  }

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-5">
        {/* Earnings */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <img className="w-16 h-16" src={assets.earning_icon} alt="Earnings Icon" />
          <div>
            <p className="text-3xl font-extrabold text-blue-700">{currency} {dashData.earnings}</p>
            <p className="text-sm font-semibold text-blue-500 tracking-wide">Earnings</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <img className="w-16 h-16" src={assets.appointments_icon} alt="Appointments Icon" />
          <div>
            <p className="text-3xl font-extrabold text-green-700">{dashData.appointments}</p>
            <p className="text-sm font-semibold text-green-500 tracking-wide">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <img className="w-16 h-16" src={assets.patients_icon} alt="Patients Icon" />
          <div>
            <p className="text-3xl font-extrabold text-purple-700">{dashData.patients}</p>
            <p className="text-sm font-semibold text-purple-500 tracking-wide">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-12 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 rounded-t-xl border-b border-gray-200 bg-gray-50">
          <img src={assets.list_icon} alt="list_icon" className="w-6 h-6" />
          <p className="font-semibold text-lg text-gray-700">Latest Bookings</p>
        </div>

        {/* Appointments List */}
        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => {
              const displayDate = parseDateTime(item.slotDate, item.slotTime);

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    {/* User Image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {item.userId?.image ? (
                        <img 
                          src={item.userId.image} 
                          alt="Patient" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                          {item.userId?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      {/* Patient Name */}
                      <p className="font-semibold text-gray-900 text-lg">
                        {item.userId?.name || 'Unknown Patient'}
                      </p>
                      {/* Appointment Date & Time */}
                      <p className="text-sm text-gray-500">
                        {displayDate.toLocaleString(undefined, {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {item.cancelled || item.canceled ? (
                    <p className="text-red-600 font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-600 font-medium">Completed</p>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        type="button"
                        title="Cancel appointment"
                        className="p-2 bg-red-100 rounded-md hover:bg-red-200 transition transform hover:scale-110 active:scale-95 shadow-sm flex items-center justify-center"
                      >
                        <img src={assets.cancel_icon} alt="Cancel" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        type="button"
                        title="Complete appointment"
                        className="p-2 bg-green-100 rounded-md hover:bg-green-200 transition transform hover:scale-110 active:scale-95 shadow-sm flex items-center justify-center"
                      >
                        <img src={assets.tick_icon} alt="Complete" className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400 py-10 italic">No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;