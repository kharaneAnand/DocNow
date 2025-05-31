import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

//API for the adding the doctor 
const addDoctor = async(req,res)=>{
    try {
        
        const {name , email , password , speciality , degree , fees , address , about , experience } = req.body
        const imageFile = req.file 

         if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        // checking for all data to add ;
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !address){
            return res.json({success:false , message:"missing details"})
        }
        // validating email format 
        if(!validator.isEmail(email)){
            return res.json({success:false , message:"please Enter a valid Email"})
        }

        // validating strog password :- 
        if(password.length < 8){
            return res.json({success:false , message:"please Enter a strong password"})
        }

        //hashing the doctor password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        // upload image to cloudinary 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"})
        const imageUrl = imageUpload.secure_url


        const doctorData = {
            name ,
            email ,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true , message:"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

// API for the admin login 
const loginAdmin = async(req , res) =>{
    try {
        
        const {email , password} = req.body 

        if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true , token})
        }
        else{
            res.json({success:false , message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

//API to get the all doctor list for the admin panel 
const allDoctors = async(req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true , doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    
    }
}

//API to get all apointment list 
const appointmentsAdmin = async(req, res) => {
  try {
    const appointments = await appointmentModel.find({})
      .populate('userId', 'name image dob')  
      .populate('docId', 'name image')       

    res.json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//ApI for the Appointment cancellation 
const appointmentCancel = async (req, res) => {
  try {
    const userId = req.userId; 
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
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

//API to get the dashboard data for the admin pannel 
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});

    // Populate doctor info inside latest appointments
    const appointments = await appointmentModel.find({})
      .sort({ date: -1 })     // latest first
      .limit(5)
      .populate('docId', 'name image')  // get doctor name and image only
      .lean(); // convert to plain JS objects for easier manipulation if needed

    const dashData = {
      doctors: doctors.length,
      appointments: await appointmentModel.countDocuments(), // count total appointments
      patients: users.length,
      latestAppointments: appointments.map(app => ({
        ...app,
        docData: app.docId,  // add docData field for frontend convenience
      })),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {addDoctor , loginAdmin , allDoctors , appointmentsAdmin , appointmentCancel , adminDashboard}