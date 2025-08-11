// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'crm-home': "url('src/assets/images/home-bg.jpg')",
      },
    },
  },
  plugins: [],
};