import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import phone from './phone.png'
import email from './email.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    phone ,
    email
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]


export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Arush Patil',
    image: doc1,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Arush Patil provides preventive and primary care with a focus on common ailments, chronic illnesses, and seasonal infections. He believes in building strong patient relationships through thorough check-ups, clear communication, and accessible medical advice for families in both cities and villages.',
    fees: 500,
    address: {
      line1: '17th Cross, JP Nagar',
      line2: 'Bangalore, Karnataka'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Mrunmai More',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Mrunmai More is committed to offering expert care in menstrual health, pregnancy, and menopause. She helps women make informed decisions about reproductive health while providing support through every phase of womanhood with compassion and a strong patient-first approach.',
    fees: 600,
    address: {
      line1: 'Sector 5, Shivaji Nagar',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Sarah Iyer',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Year',
    about: 'Dr. Sarah Iyer focuses on acne, pigmentation, and allergic skin conditions common among Indian youth. She combines modern dermatology with gentle Ayurvedic tips, offering effective and personalized skincare solutions to people dealing with pollution, humidity, and stress-related issues.',
    fees: 400,
    address: {
      line1: 'Linking Road, Bandra',
      line2: 'Mumbai, Maharashtra'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Aditya Chawla',
    image: doc4,
    speciality: 'Pediatrician',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Aditya Chawla provides specialized pediatric care with attention to nutrition, immunizations, and growth milestones. He works closely with parents to ensure holistic development and quick recovery from common infections among children in busy metropolitan areas like Delhi.',
    fees: 450,
    address: {
      line1: 'Sector 22, Dwarka',
      line2: 'Delhi'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Anushka Sharma',
    image: doc5,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Anushka Sharma offers care for conditions like epilepsy, migraines, and nerve disorders. She focuses on long-term treatment and patient education, using technology and clinical expertise to help patients better manage their neurological conditions in India’s healthcare landscape.',
    fees: 800,
    address: {
      line1: 'Anna Nagar',
      line2: 'Chennai, Tamil Nadu'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Aniket Verma',
    image: doc6,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Aniket Verma specializes in diagnosing and treating neurological issues like strokes, Parkinson’s disease, and seizure disorders. He focuses on delivering empathetic and results-driven care, guiding families through difficult health journeys with clarity and medical precision.',
    fees: 800,
    address: {
      line1: 'Hazratganj',
      line2: 'Lucknow, Uttar Pradesh'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Narendra Jha',
    image: doc7,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Narendra Jha treats fever, diabetes, blood pressure, and other general conditions. His holistic approach includes diet, lifestyle guidance, and regular follow-ups, making him a dependable choice for families looking for long-term health support in urban India.',
    fees: 500,
    address: {
      line1: 'Camp Area',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Timothy Reddy',
    image: doc8,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Timothy Reddy provides personalized care in gynecology with a focus on fertility, reproductive health, and antenatal guidance. His patient-friendly consultations are well-suited for women in both urban and semi-urban areas who seek clarity and comfort in treatment.',
    fees: 600,
    address: {
      line1: 'KPHB Colony',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Ava Mehra',
    image: doc9,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Year',
    about: 'Dr. Ava Mehra helps patients manage skin issues caused by pollution, heat, and allergens commonly found in Indian cities. She treats acne, rashes, and pigmentation through safe, dermatologist-approved methods tailored to Indian skin tones and weather conditions.',
    fees: 400,
    address: {
      line1: 'Sector 21, Chandigarh',
      line2: 'Punjab'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Raghav Singh',
    image: doc10,
    speciality: 'Pediatrician',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Raghav Singh offers thorough pediatric services focusing on immunizations, child growth tracking, and disease prevention. He believes in early intervention and parental education to ensure that children grow up healthy, strong, and safe from seasonal illnesses.',
    fees: 450,
    address: {
      line1: 'Ashok Nagar',
      line2: 'Ranchi, Jharkhand'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Sneha Nair',
    image: doc11,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Sneha Nair provides expert care for conditions such as migraines, neuropathy, and spinal disorders. She uses advanced diagnostic tools and a warm, supportive approach to ensure each patient understands their condition and finds sustainable treatment in Kerala.',
    fees: 850,
    address: {
      line1: 'Technopark Road',
      line2: 'Trivandrum, Kerala'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Manish Kulkarni',
    image: doc12,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Manish Kulkarni has expertise in epilepsy, Parkinson’s, and neurodegenerative diseases. He combines research-backed care with practical support for patients and families, helping them navigate complex brain disorders with confidence and consistent follow-ups in Maharashtra.',
    fees: 800,
    address: {
      line1: 'Shivajinagar',
      line2: 'Nagpur, Maharashtra'
    }
  },
  {
    _id: 'doc13',
    name: 'Dr. Chloe Kapoor',
    image: doc13,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Chloe Kapoor provides treatment for infections, flu, chronic fatigue, and long-term health concerns. Her practice is rooted in preventive care and community health, making her a reliable first-contact doctor for families across Noida and surrounding areas.',
    fees: 500,
    address: {
      line1: 'Sector 18, Noida',
      line2: 'Uttar Pradesh'
    }
  },
  {
    _id: 'doc14',
    name: 'Dr. Rishi Ahuja',
    image: doc14,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Rishi Ahuja provides modern OB-GYN services such as pregnancy care, hormonal therapy, and menstrual health management. His professional yet approachable style ensures that women receive high-quality reproductive health support in both clinical and counseling environments.',
    fees: 650,
    address: {
      line1: 'C-Scheme',
      line2: 'Jaipur, Rajasthan'
    }
  },
  {
    _id: 'doc15',
    name: 'Dr. Amrita Banerjee',
    image: doc15,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Year',
    about: 'Dr. Amrita Banerjee addresses skin concerns like acne scars, pigmentation, fungal infections, and eczema. She provides detailed skincare routines tailored to Indian skin types and lifestyles, making her a sought-after dermatologist among Kolkata’s young professionals.',
    fees: 400,
    address: {
      line1: 'Salt Lake Sector V',
      line2: 'Kolkata, West Bengal'
    }
  }
]
