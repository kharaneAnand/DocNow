import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
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
    razorpay_logo
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
    about: 'Dr. Arush Patil is dedicated to delivering affordable and comprehensive healthcare. He specializes in preventive care, early diagnosis, and holistic treatment strategies for common illnesses in urban and rural India.',
    fees: 500,
    address: {
      line1: '17th Cross, JP Nagar',
      line2: 'Bangalore, Karnataka'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Mrunmai more',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Mrunmai Deshmukh provides expert care in women’s health, including prenatal care, menstrual disorders, and maternal health, with a compassionate and patient-centric approach.',
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
    about: 'Dr. Sarah Iyer is a young dermatologist focused on treating skin allergies, acne, and hair issues common among Indian youth using modern and Ayurvedic practices.',
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
    about: 'Dr. Aditya Chawla offers expert care for children and infants, focusing on nutrition, immunizations, and general well-being of kids in Indian families.',
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
    about: 'Dr. Jennifer Thomas specializes in treating neurological disorders such as migraines, epilepsy, and nerve pain using evidence-based care in the Indian healthcare system.',
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
    about: 'Dr. Aniket Verma is known for his patient-centered approach in managing neurological disorders like strokes, seizures, and Parkinson’s disease.',
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
    about: 'Dr. D’Souza provides reliable primary healthcare services, treating lifestyle diseases such as diabetes and hypertension prevalent in Indian adults.',
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
    about: 'Dr. Timothy Reddy focuses on women’s reproductive health and family planning, serving both urban and semi-urban communities.',
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
    about: 'Dr. Ava Mehra helps patients manage skin problems related to pollution, humidity, and common allergens seen across Indian cities.',
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
    about: 'Dr. Raghav Singh focuses on child development, vaccinations, and seasonal illness prevention with a friendly and attentive approach.',
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
    about: 'Dr. Sneha Nair offers modern neurological care for urban patients dealing with complex brain and nerve conditions in India.',
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
    about: 'Dr. Manish Kulkarni is a highly skilled neurologist with experience in treating epilepsy, movement disorders, and neurodegenerative diseases.',
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
    about: 'Dr. Chloe Kapoor delivers holistic treatment for flu, viral infections, and chronic health issues tailored to Indian families.',
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
    about: 'Dr. Rishi Ahuja provides expert OB-GYN care including antenatal services and menstrual health support for women in all life stages.',
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
    about: 'Dr. Amrita Banerjee focuses on treating pigmentation, acne scars, and other common dermatological issues in Indian skin types.',
    fees: 400,
    address: {
      line1: 'Salt Lake Sector V',
      line2: 'Kolkata, West Bengal'
    }
  }
]
