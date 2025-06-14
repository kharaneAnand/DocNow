import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import cancel_icon from '../../assets/cancel_icon.svg';

const Dashboard = () => {
  const { dashData, aToken, getDashData, cancelAppointment } = useContext(AdminContext);
  const { currency } = useContext(AppContext);
  const [usersMap, setUsersMap] = useState({});

  // Fetch dashboard data on load
  useEffect(() => {
    if (!dashData && aToken) {
      getDashData();
    }
  }, [aToken]);

  // Fetch user data based on appointments
  useEffect(() => {
    if (dashData?.latestAppointments?.length > 0) {
      const uniqueUserIds = [
        ...new Set(dashData.latestAppointments.map((item) => item.userId)),
      ];

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
    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    if (isNaN(hours) || isNaN(minutes)) return new Date(NaN);
    if (meridian === 'PM' && hours !== 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;
    return new Date(year, month - 1, day, hours, minutes);
  };

  if (!dashData) {
    return (
      <div className="text-center py-20 text-gray-400 italic">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <img className="w-16 h-16" src={assets.doctor_icon} alt="Earnings" />
          <div>
            <p className="text-3xl font-extrabold text-blue-700">{dashData.doctors}</p>
            <p className="text-sm font-semibold text-blue-500">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <img className="w-16 h-16" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-3xl font-extrabold text-green-700">{dashData.appointments}</p>
            <p className="text-sm font-semibold text-green-500">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <img className="w-16 h-16" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-3xl font-extrabold text-purple-700">{dashData.patients}</p>
            <p className="text-sm font-semibold text-purple-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white mt-12 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 px-6 py-5 rounded-t-xl border-b border-gray-200 bg-gray-50">
          <img src={assets.list_icon} alt="list_icon" className="w-6 h-6" />
          <p className="font-semibold text-lg text-gray-700">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.map((items, index) => {
            const appointmentDate = parseDateTime(items.slotDate, items.slotTime);
            const user = usersMap[items.userId];

            return (
              <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                {/* Doctor Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={items.docData.image}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{items.docData.name}</p>
                    <p className="text-sm text-gray-500">
                      {appointmentDate.toLocaleDateString()} • {items.slotTime}
                    </p>
                    <p className="text-sm text-gray-400">
                      Patient: {user?.name || 'Unknown User'}
                    </p>
                  </div>
                </div>

                {/* Status / Action */}
                <div>
                  {items.cancelled ? (
                    <p className="text-red-500 text-xs font-semibold italic tracking-wide select-none">
                      Cancelled
                    </p>
                  ) : items.isCompleted ? (
                    <p className="text-green-500 text-xs font-semibold italic tracking-wide select-none">
                      Completed
                    </p>
                  ) : (
                    <img
                      className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity"
                      src={cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                      onClick={() => cancelAppointment(items._id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
