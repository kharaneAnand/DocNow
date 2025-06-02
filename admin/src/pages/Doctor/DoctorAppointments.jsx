import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">All Appointments</h2>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto">
        {/* Header row */}
        <div className="hidden max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 max-sm:px-4 max-sm:py-2 border-b border-gray-200 text-gray-600 font-semibold">
          <p>Patient</p>
          <p>Details</p>
        </div>

        <div className="hidden max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b border-gray-200 text-gray-600 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment rows */}
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={item._id || index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors duration-150 max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 max-sm:px-4 max-sm:py-3"
            >
              {/* Index */}
              <p className="text-gray-700 font-medium">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                {item.userId ? (
                  <>
                    <img
                      src={item.userId.image || assets.placeholder_profile}
                      alt={item.userId.name || 'Patient'}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <p className="font-medium text-gray-800">{item.userId.name}</p>
                  </>
                ) : (
                  <p className="text-gray-400 italic">User data missing</p>
                )}
              </div>

              {/* Payment Status */}
              <p
                className={`text-xs font-semibold px-3 py-1 rounded-full inline-block text-center select-none ${
                  item.payment
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                }`}
              >
                {item.payment ? 'Paid' : 'Cash'}
              </p>

              {/* Age */}
              <p className="text-gray-700">
                {item.userId?.dob ? calculateAge(item.userId.dob) : '-'}
              </p>

              {/* Date & Time */}
              <p className="text-gray-700 whitespace-nowrap">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Fees */}
              <p className="font-semibold text-gray-900">
                {currency}
                {item.amount?.toFixed(2) || '0.00'}
              </p>

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
                    title="Confirm appointment"
                    className="p-2 bg-green-100 rounded-md hover:bg-green-200 transition transform hover:scale-110 active:scale-95 shadow-sm flex items-center justify-center"
                  >
                    <img src={assets.tick_icon} alt="Confirm" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
