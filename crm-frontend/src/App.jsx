import React from 'react';
import { usePage, PageProvider } from './context/PageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
// import MetricCard from './components/MetricCard';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import ViewProfilePage from './pages/ViewProfile';
import EditProfilePage from './pages/EditProfile';
import AboutPage from './pages/AboutPage';
import AddLeadOrCustomerPage from './pages/AddLeadOrCustomerPage';
import Footer from "./components/Footer";

const MainApp = () => {
  const { currentPage } = usePage();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'viewProfile':
        return <ViewProfilePage />;
      case 'editProfile':
        return <EditProfilePage />;
      case 'addLeadOrCustomer':
        return <AddLeadOrCustomerPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="font-sans antialiased">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .animate-underline {
            animation: expandUnderline 0.3s forwards;
          }
          @keyframes expandUnderline {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}
      </style>
      <Navbar />
      {renderPage()}
      <Footer/>
    </div>
  );
};

// Wrap the main app component with providers
const App = () => (
  <PageProvider>
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  </PageProvider>
);

export default App;