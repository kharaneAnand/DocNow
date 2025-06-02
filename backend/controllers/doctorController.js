import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import mongoose from 'mongoose'

const changeAvailablity = async(req,res) => {
    try {
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId , {available : !docData.available })
        res.json({success:true , message:'Availability Changed'})

    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

const doctorList = async(req , res ) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password' , '-email'])
        res.json({success:true , doctors})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

// API for the doctor login 
const loginDoctor = async(req , res) => {
    try {
        const {email , password } = req.body 
        const doctor = await doctorModel.findOne({email})
        
        if(!doctor){
            return res.json({success:false , message:'Invalid Credentials'})
        }
        
        const isMatched = await bcrypt.compare(password , doctor.password)
        if(isMatched){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true , token})
        }
        else{
            res.json({success:false , message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

//Api to get doctor appointment for the doctor pannel 
const appointmentsDoctor = async (req, res) => {
    try {
        console.log('Request headers:', req.headers);
        console.log('Token:', req.headers.dtoken || req.headers.dToken);
        
        // Extract doctor ID from JWT token
        const token = req.headers.dtoken || req.headers.dToken;
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (tokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const docId = decoded.id;
        console.log('Doctor ID from token:', docId);

        if (!docId) {
            return res.status(400).json({ success: false, message: 'Doctor ID missing from token' });
        }

        const appointments = await appointmentModel.find({ docId }).populate('userId');
        console.log('Found appointments:', appointments.length);
        
        res.json({ success: true, appointments });
    } catch (error) {
        console.log('Error in appointmentsDoctor:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

//Api to mark appointment completed for the doctor pannel 
const appointmentComplete = async (req , res) => {
    try {
        const { appointmentId } = req.body;
        
        console.log('Complete appointment request:', { appointmentId });

        // Validate appointmentId
        if (!appointmentId) {
            return res.json({success:false , message:'Appointment ID is required'});
        }

        // Validate if appointmentId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.json({success:false , message:'Invalid appointment ID format'});
        }

        // Extract doctor ID from JWT token
        const token = req.headers.dtoken || req.headers.dToken;
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (tokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const docId = decoded.id;

        // Find the appointment first to verify it exists and belongs to the doctor
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({success:false , message:'Appointment not found'});
        }

        // Check if appointment belongs to the doctor (optional security check)
        if (appointmentData.docId.toString() !== docId.toString()) {
            return res.json({success:false , message:'Unauthorized: Appointment does not belong to this doctor'});
        }

        // Update the appointment
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { isCompleted: true },
            { new: true }
        );

        console.log('Appointment completed:', updatedAppointment);
        
        return res.json({success:true , message:'Appointment Completed'});
        
    } catch (error) {
        console.log('Error in appointmentComplete:', error);
        res.status(500).json({success:false , message: 'Server error: ' + error.message});
    }
}

//Api to cancel the appointment for the doctor pannel 
const appointmentCancel = async (req , res) => {
    try {
        const { appointmentId } = req.body;
        
        console.log('Cancel appointment request:', { appointmentId });

        // Validate appointmentId
        if (!appointmentId) {
            return res.json({success:false , message:'Appointment ID is required'});
        }

        // Validate if appointmentId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
            return res.json({success:false , message:'Invalid appointment ID format'});
        }

        // Extract doctor ID from JWT token
        const token = req.headers.dtoken || req.headers.dToken;
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (tokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const docId = decoded.id;

        // Find the appointment first to verify it exists and belongs to the doctor
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({success:false , message:'Appointment not found'});
        }

        // Check if appointment belongs to the doctor (optional security check)
        if (appointmentData.docId.toString() !== docId.toString()) {
            return res.json({success:false , message:'Unauthorized: Appointment does not belong to this doctor'});
        }

        // Update the appointment
        const updatedAppointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { cancelled: true },
            { new: true }
        );

        console.log('Appointment cancelled:', updatedAppointment);
        
        return res.json({success:true , message:'Appointment Cancelled'});
        
    } catch (error) {
        console.log('Error in appointmentCancel:', error);
        res.status(500).json({success:false , message: 'Server error: ' + error.message});
    }
}



// Api to get the dashboard data for the doctor pannel 
const doctorDashboard = async(req , res) =>{

    try {
        const token = req.headers.dtoken || req.headers.dToken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (tokenError) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        const docId = decoded.id;
        console.log("Doctor ID from token (dashboard):", docId);

        // FIXED: Populate userId to get user data (name, image)
        const appointments = await appointmentModel.find({docId}).populate('userId', 'name image');

        let earnings = 0 ;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount 
            }
        })

        let patients = []
            appointments.forEach(item => {
            if (!patients.includes(item.userId._id.toString())) {
                patients.push(item.userId._id.toString());
            }
        });

        const dashData = {
            earnings ,
            appointments : appointments.length , 
            patients : patients.length ,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success:true , dashData})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false , message:error.message})
    }
}


export {changeAvailablity , doctorList , loginDoctor , appointmentsDoctor , appointmentComplete ,appointmentCancel , doctorDashboard}