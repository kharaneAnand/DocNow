 /** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
          'primary' : "#5CB8FF"
        // 'primary':"#5f6FFF"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        'auto':'repeat(auto-fill , minmax(200px , 1fr))'
      }
    },
  },
  plugins: [],
 }