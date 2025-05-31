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
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']; // Fixed typo: WEN -> WED

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
    console.log("=== Starting getAvailableSlots ===");
    const allSlots = [];
    const today = new Date();
    console.log("Today:", today);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      console.log(`Day ${i} date:`, date);

      const daySlots = [];
      const startHour = (i === 0 && today.getHours() > 10) ? today.getHours() + 1 : 10;
      const startMinute = (i === 0 && today.getMinutes() > 30) ? 30 : 0;

      let slotTime = new Date(date);
      slotTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(21, 0, 0, 0);

      console.log(`Day ${i} - Start: ${slotTime}, End: ${endTime}`);

      while (slotTime < endTime) {
        const slotCopy = new Date(slotTime);
        const timeString = slotCopy.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        daySlots.push({
          datetime: slotCopy,
          time: timeString,
        });

        console.log(`Added slot: ${timeString}, datetime:`, slotCopy);
        slotTime = new Date(slotTime.getTime() + 30 * 60 * 1000);
      }

      console.log(`Day ${i} total slots:`, daySlots.length);
      allSlots.push(daySlots);
    }

    console.log("All slots created:", allSlots);
    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    console.log("=== Starting booking process ===");
    console.log("Current state:", {
      token: !!token,
      slotTime,
      slotIndex,
      docSlotsLength: docSlots.length,
      selectedDaySlots: docSlots[slotIndex]
    });

    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    if (!docSlots || docSlots.length === 0) {
      toast.error("No appointment slots available");
      return;
    }

    if (slotIndex < 0 || slotIndex >= docSlots.length) {
      toast.error("Invalid day selection");
      return;
    }

    const selectedDaySlots = docSlots[slotIndex];
    console.log("Selected day slots:", selectedDaySlots);

    if (!selectedDaySlots || selectedDaySlots.length === 0) {
      toast.error("No slots found for selected day");
      return;
    }

    console.log("Looking for slot with time:", slotTime);
    console.log("Available times:", selectedDaySlots.map(slot => slot.time));

    const selectedSlot = selectedDaySlots.find(slot => slot.time === slotTime);
    console.log("Found selected slot:", selectedSlot);

    if (!selectedSlot) {
      toast.error("Selected slot not found");
      console.error("Could not find slot with time:", slotTime);
      return;
    }

    if (!selectedSlot.datetime) {
      toast.error("Slot datetime is undefined");
      console.error("Slot datetime is missing:", selectedSlot);
      return;
    }

    try {
      console.log("Processing slot datetime:", selectedSlot.datetime);
      console.log("Datetime type:", typeof selectedSlot.datetime);
      console.log("Is Date object:", selectedSlot.datetime instanceof Date);

      // Create a fresh date object
      let bookingDate;
      
      if (selectedSlot.datetime instanceof Date) {
        bookingDate = new Date(selectedSlot.datetime.getTime());
      } else {
        console.log("Converting to Date from:", selectedSlot.datetime);
        bookingDate = new Date(selectedSlot.datetime);
      }

      console.log("Created booking date:", bookingDate);
      console.log("Date is valid:", !isNaN(bookingDate.getTime()));

      if (!bookingDate || isNaN(bookingDate.getTime())) {
        console.error("Invalid date created");
        console.error("Original datetime:", selectedSlot.datetime);
        toast.error("Invalid date - please refresh and try again");
        return;
      }

      const slotDate = `${bookingDate.getDate()}_${bookingDate.getMonth() + 1}_${bookingDate.getFullYear()}`;
      console.log("Formatted slot date:", slotDate);

      console.log("Making API call with:", {
        docId,
        slotDate,
        slotTime,
        url: backendUrl + '/api/user/book-appointment'
      });

      const { data } = await axios.post(
  backendUrl + '/api/user/book-appointment',
  { 
    docId, 
    slotDate, // Keep your current format: "30_5_2025"
    slotTime,
    // Add additional date formats if backend needs them
    fullDate: bookingDate.toISOString(), // ISO format
    timestamp: bookingDate.getTime(),     // Unix timestamp
    dateObject: {
      day: bookingDate.getDate(),
      month: bookingDate.getMonth() + 1,
      year: bookingDate.getFullYear()
    }
  },
  { headers: { token } }
);

      console.log("API response:", data);

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('=== BOOKING ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Selected slot data:', selectedSlot);
      console.error('Axios error response:', error.response?.data);
      
      toast.error(error.response?.data?.message || error.message || "An error occurred while booking appointment");
    }
  };

  useEffect(() => {
    console.log("=== Fetching doc info ===");
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    console.log("=== Doc info changed ===", docInfo);
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // Debug useEffect to monitor state changes
  useEffect(() => {
    console.log("=== State updated ===");
    console.log("docSlots:", docSlots);
    console.log("slotIndex:", slotIndex);
    console.log("slotTime:", slotTime);
  }, [docSlots, slotIndex, slotTime]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-72 h-72 object-contain sm:max-w-72 rounded-lg' src={docInfo.image} alt="Doc" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="info" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length > 0 && docSlots.map((item, index) => (
              <div
                onClick={() => {
                  console.log("Day selected:", index);
                  setSlotIndex(index);
                  setSlotTime(''); // Reset time selection when day changes
                }}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => {
                  console.log("Time selected:", item.time);
                  setSlotTime(item.time);
                }}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                key={index}
              >
                {item.time}
              </p>
            ))
          }
        </div>

        <button 
          onClick={bookAppointment} 
          className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'
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