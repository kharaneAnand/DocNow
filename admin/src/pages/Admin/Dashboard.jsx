import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  useEffect(() => {
    getDashData();
  }, [aToken]);

  // Helper function to parse custom date and time format
  const parseDateTime = (dateStr, timeStr) => {
    // dateStr example: "1_6_2025" -> day_month_year
    // timeStr example: "10:30 AM"
    const [day, month, year] = dateStr.split('_').map(Number);

    // Parse time string into hours and minutes
    const [time, meridian] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (meridian === 'PM' && hours !== 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;

    // Create JS Date object (month is 0-indexed)
    return new Date(year, month - 1, day, hours, minutes);
  };

  if (!dashData) {
    return <p className="text-center mt-20 text-gray-500 text-lg font-medium animate-pulse">Loading Dashboard...</p>;
  }

  return (
    <div className="m-6 max-w-7xl mx-auto">

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Doctors */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg">
          <img className="w-16 h-16" src={assets.doctor_icon} alt="Doctor Icon" />
          <div>
            <p className="text-3xl font-extrabold text-blue-700">{dashData.doctors}</p>
            <p className="text-sm font-semibold text-blue-500 tracking-wide">Doctors</p>
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

      {/* Latest Appointments Section */}
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
                    {item.docData ? (
                      <>
                        <img
                          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-300 shadow-sm"
                          src={item.docData.image}
                          alt="Doctor"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{item.docData.name}</p>
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
                      </>
                    ) : (
                      <div>
                        <p className="text-red-600 font-semibold">Doctor data missing</p>
                        <p className="text-sm text-gray-500">{item.slotDate}</p>
                      </div>
                    )}
                  </div>

                  {item.cancelled ? (
                    <p className="text-red-600 text-sm font-semibold italic">Cancelled</p>
                  ) : (
                    <img
                      className="w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(item._id)}
                    />
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

export default Dashboard;
