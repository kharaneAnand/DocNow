import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) =>{


    const currency = "₹"

 const calculateAge = (dob) => {
  if (!dob) return NaN;

  // dob in "DD-MM-YYYY" format — parse manually:
  const parts = dob.split('-'); // ["28", "10", "2004"]

  if (parts.length !== 3) {
    console.warn("Invalid dob format:", dob);
    return NaN;
  }

  // Rearrange to ISO "YYYY-MM-DD"
  const isoDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const birthDate = new Date(isoDateStr);
  if (isNaN(birthDate)) {
    console.warn("Invalid birthDate after parsing:", isoDateStr);
    return NaN;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};


  const months = [ ' ','Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' ,'Nov' , 'Dec']

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_') 
    return dateArray[0]+" " + months[Number(dateArray[1])]+" " + dateArray[2]
  }

    const value = {
        calculateAge ,
        slotDateFormat ,
        currency
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider