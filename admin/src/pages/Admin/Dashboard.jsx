import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dashData, dToken, getDashData, cancelAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [usersMap, setUsersMap] = useState({}); // to store user info keyed by userId

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // When dashData updates, fetch user info for appointments
  useEffect(() => {
    if (dashData?.latestAppointments?.length) {
      const uniqueUserIds = [
        ...new Set(dashData.latestAppointments.map((item) => item.userId)),
      ];

      // Fetch user info for each userId
      Promise.all(
        uniqueUserIds.map((id) =>
          fetch(`/api/users/${id}`).then((res) => {
            if (!res.ok) throw new Error('Failed to fetch user ' + id);
            return res.json();
          })
        )
      )
        .then((users) => {
          const map = {};
          users.forEach((user) => {
            map[user._id] = user;
          });
          setUsersMap(map);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, [dashData]);

  const parseDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return new Date(NaN);

  const parts = dateStr.split('_');
  if (parts.length !== 3) return new Date(NaN);

  const [day, month, year] = parts.map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return new Date(NaN);

  const timeParts = timeStr.split(' ');
  if (timeParts.length !== 2) return new Date(NaN);

  const [time, meridian] = timeParts;
  const [hoursStr, minutesStr] = time.split(':');
  if (!hoursStr || !minutesStr) return new Date(NaN);

  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  if (isNaN(hours) || isNaN(minutes)) return new Date(NaN);

  if (meridian === 'PM' && hours !== 12) hours += 12;
  if (meridian === 'AM' && hours === 12) hours = 0;

  return new Date(year, month - 1, day, hours, minutes);
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
        <div className="flex items-center gap-3 px-6 py-5 rounded-t-xl border-b border-gray-200 bg-gray-50">
          <img src={assets.list_icon} alt="list_icon" className="w-6 h-6" />
          <p className="font-semibold text-lg text-gray-700">Latest Bookings</p>
        </div>

        <div className="divide-y divide-gray-100">
          {dashData.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => {
              const displayDate = parseDateTime(item.slotDate, item.slotTime);
              const user = usersMap[item.userId]; // get user info by userId

              return (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={user?.imageUrl || assets.default_user_icon}
                      alt={user?.name || 'User'}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{user?.name || 'Unknown User'}</p>
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

export default DoctorDashboard;
 