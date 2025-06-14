import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    const allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const daySlots = [];
      const startHour = (i === 0 && today.getHours() > 10) ? today.getHours() + 1 : 10;
      const startMinute = (i === 0 && today.getMinutes() > 30) ? 30 : 0;

      let slotTime = new Date(date);
      slotTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(21, 0, 0, 0);

      while (slotTime < endTime) {
        const slotCopy = new Date(slotTime);
        const timeString = slotCopy.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        daySlots.push({
          datetime: slotCopy,
          time: timeString,
        });

        slotTime = new Date(slotTime.getTime() + 30 * 60 * 1000);
      }

      allSlots.push(daySlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    if (!docSlots || docSlots.length === 0 || slotIndex < 0 || slotIndex >= docSlots.length) {
      toast.error("Invalid day or no slots");
      return;
    }

    const selectedDaySlots = docSlots[slotIndex];
    const selectedSlot = selectedDaySlots.find(slot => slot.time === slotTime);

    if (!selectedSlot || !selectedSlot.datetime) {
      toast.error("Invalid or missing slot");
      return;
    }

    try {
      let bookingDate = selectedSlot.datetime instanceof Date
        ? new Date(selectedSlot.datetime.getTime())
        : new Date(selectedSlot.datetime);

      if (!bookingDate || isNaN(bookingDate.getTime())) {
        toast.error("Invalid date - please refresh and try again");
        return;
      }

      const slotDate = `${bookingDate.getDate()}_${bookingDate.getMonth() + 1}_${bookingDate.getFullYear()}`;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId,
          slotDate,
          slotTime,
          fullDate: bookingDate.toISOString(),
          timestamp: bookingDate.getTime(),
          dateObject: {
            day: bookingDate.getDate(),
            month: bookingDate.getMonth() + 1,
            year: bookingDate.getFullYear()
          }
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred while booking appointment");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log("docSlots:", docSlots);
    console.log("slotIndex:", slotIndex);
    console.log("slotTime:", slotTime);
  }, [docSlots, slotIndex, slotTime]);

  return docInfo && (
    <div className="px-4 sm:px-20 py-10">
      <div className='flex flex-col sm:flex-row gap-6 sm:gap-10'>
        <div className="flex justify-center sm:block">
          <img className='bg-primary w-full max-w-[300px] h-[250px] object-contain rounded-xl' src={docInfo.image} alt="Doc" />
        </div>
        <div className='flex-1 border border-gray-300 rounded-2xl p-4 mt-[-20px] sm:mt-0'>
          <p className='flex items-center gap-2 text-xl sm:text-2xl font-medium'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified" /></p>
          <div className='flex flex-wrap items-center gap-2 text-sm mt-1'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-1 px-2 border text-sm rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3'>About <img src={assets.info_icon} alt="info" /></p>
            <p className='text-sm text-gray-500 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee : <span className='text-headingColor'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      <div className='mt-6 font-medium'>
        <p className='text-lg'>Booking Slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 pb-2'>
          {
            docSlots.length > 0 && docSlots.map((item, index) => (
              <div
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                key={index}
                className={`text-center py-4 px-4 min-w-[60px] rounded-xl cursor-pointer text-sm
                ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300 text-gray-500 bg-white'}`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 pb-2'>
          {
            docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm px-5 py-2 rounded-full cursor-pointer
                ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-500 border border-gray-300 bg-white'}`}
                key={index}
              >
                {item.time}
              </p>
            ))
          }
        </div>

        <button
          onClick={bookAppointment}
          className='w-full sm:w-fit bg-primary text-white text-sm font-medium px-6 py-3 rounded-full my-6'
          disabled={!slotTime}
        >
          Book an appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointments;
