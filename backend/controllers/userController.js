import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


// api to register user 
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // validating an email format 
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a Valid Email' })
    }
    // validating a strong password
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter a Strong Password' })
    }

    // hashing the user password ;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name, email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    // _id -->create a token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api for user Login :
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: 'user does not exist' })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }
    else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// API to get User profile data 
const getProfile = async (req, res) => {
  try {
    const userId = req.userId // read from req.userId
    const userData = await userModel.findById(userId).select('-password')

    res.json({ success: true, userData })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api to update the user profile 
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId // read from req.userId
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "data missing" })
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {
      // upload image to the cloudinary 
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: "profile Updated" })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}



//API to book Appointment 
const bookappointment = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId;
    const { docId, slotDate, slotTime } = req.body;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: 'Missing required data' });
    }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) return res.json({ success: false, message: 'Doctor not found' });
    if (!doctor.available) return res.json({ success: false, message: 'Doctor not available' });

    const slots_booked = doctor.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: 'Slot is not available' });
    }

    // Add slotTime to slots_booked for the date
    if (slots_booked[slotDate]) {
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Create appointment with ObjectId refs and fees
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      amount: doctor.fees,
      date: Date.now()
    };

    const appointment = new appointmentModel(appointmentData);
    await appointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: 'Appointment booked' });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


// ApI to get user Appointment for the frontend My-appointment page 

const listAppointments = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await appointmentModel.find({ userId })
      .populate('docId', 'name image speciality address');

    return res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


//Api to cancel Appointments 
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId; // use from auth middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // verify appointment user
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // releasing the doctor slots
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}




export { registerUser, loginUser, getProfile, updateProfile, bookappointment, listAppointments , cancelAppointment };

