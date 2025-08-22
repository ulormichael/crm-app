import React from 'react';


// About Page
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-2xl w-full transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 font-inter leading-tight">
          About this CRM App
        </h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          This is a simple, single-page CRM (Customer Relationship Management) application built with React and Tailwind CSS.
          It demonstrates core front-end concepts, including:
        </p>
        <ul className="list-disc list-inside text-left text-gray-600 space-y-2 max-w-md mx-auto mb-6">
          <li>**State Management:** Using React's `useState` and `useContext` hooks to manage application state and share it across components.</li>
          <li>**Component-Based Architecture:** The app is broken down into reusable components like `Navbar`, `Button`, `MetricCard`, and various pages.</li>
          <li>**Conditional Rendering:** Displaying different components based on the user's login status or the current page.</li>
          <li>**Form Handling:** Managing user input and submitting data for new and edited CRM entries.</li>
          <li>**Simulated Data:** The app uses an in-memory array to simulate a database, allowing you to perform CRUD (Create, Read, Update, Delete) operations without a backend.</li>
        </ul>
        <p className="text-lg text-gray-600 leading-relaxed">
          The purpose of this app is to provide a clear example of how to build a modern web application with a focus on a clean, responsive UI and good component design.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;