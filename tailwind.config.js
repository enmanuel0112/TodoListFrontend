/** @type {import('tailwindcss').Config} */

 module.exports = {
     content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors:{
           brand:{
            bgApp: "#f0f3e8",
            cardTask: '#FDFDF6',
            lightShadow: '#EDEFE5',
            mainText: '#333333',
            secondaryText: '#666666',
            green: '#6b936d'
           }
        },
    },
  },
  plugins: [
    
  ],
 }