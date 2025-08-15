import React from 'react';
import { usePage, PageProvider } from './context/PageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import ViewProfilePage from './pages/ViewProfile';
import EditProfilePage from './pages/EditProfile';
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





// import React, { createContext, useContext, useState, useEffect } from 'react';

// // --- Auth Context ---
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   // We'll store a list of registered users here for this simulated app
//   const [registeredUsers, setRegisteredUsers] = useState([{ username: 'user', password: 'password' }]);
//   const [user, setUser] = useState(null); // null means not logged in, could be an object with user info

//   // Simulate login
//   const login = (username, password) => {
//     // In a real app, you'd send these to your backend for authentication
//     const foundUser = registeredUsers.find(u => u.username === username && u.password === password);
//     if (foundUser) {
//       setUser({ username: foundUser.username });
//       return true;
//     }
//     return false;
//   };

//   // Simulate sign up
//   const signup = (username, password) => {
//     // Check if the username already exists
//     if (registeredUsers.some(u => u.username === username)) {
//       return { success: false, error: 'Username already exists.' };
//     }
//     // In a real app, you would hash the password
//     const newUser = { username, password };
//     setRegisteredUsers(prevUsers => [...prevUsers, newUser]);
//     setUser({ username });
//     return { success: true };
//   };

//   // Simulate logout
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // --- Page Routing Context ---
// const PageContext = createContext(null);

// const PageProvider = ({ children }) => {
//   const [currentPage, setCurrentPage] = useState('home'); // Default page
//   const [selectedItem, setSelectedItem] = useState(null); // To store the lead/customer being viewed/edited

//   // Simulated CRM Data - moved here to be accessible by Dashboard and EditProfilePage
//   const [crmData, setCrmData] = useState([
//     { id: 1, type: 'Lead', name: 'Alice Johnson', email: 'alice@example.com', status: 'New' },
//     { id: 2, type: 'Customer', name: 'Bob Williams', email: 'bob@example.com', status: 'Active' },
//     { id: 3, type: 'Lead', name: 'Charlie Davis', email: 'charlie@example.com', status: 'Contacted' },
//     { id: 4, type: 'Customer', name: 'Diana Miller', email: 'diana@example.com', status: 'Active' },
//     { id: 5, type: 'Lead', name: 'Eve Brown', email: 'eve@example.com', status: 'Qualified' },
//   ]);

//   // Function to update CRM data after editing
//   const updateCrmData = (updatedItem) => {
//     setCrmData(prevData =>
//       prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
//     );
//   };

//   return (
//     <PageContext.Provider value={{ currentPage, setCurrentPage, selectedItem, setSelectedItem, crmData, setCrmData, updateCrmData }}>
//       {children}
//     </PageContext.Provider>
//   );
// };

// const usePage = () => useContext(PageContext);


// // --- Components ---

// // Navigation Bar
// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { currentPage, setCurrentPage } = usePage();

//   // Custom NavLink component for routing (defined inside Navbar for simplicity in single file)
//   const NavLink = ({ to, children }) => {
//     const isActive = currentPage === to;

//     return (
//       <button
//         onClick={() => setCurrentPage(to)}
//         className={`relative text-white font-medium text-lg py-1 px-2 rounded-md transition duration-300 ease-in-out
//           ${isActive ? 'bg-blue-700 bg-opacity-70' : 'hover:bg-blue-500 hover:bg-opacity-50'}`}
//       >
//         {children}
//         {isActive && (
//           <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 origin-left animate-underline"></span>
//         )}
//       </button>
//     );
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-2xl font-bold font-inter">CRM App</div>
//         <div className="flex space-x-6">
//           <NavLink to="home">Home</NavLink>
//           {user ? (
//             <>
//               <NavLink to="dashboard">Dashboard</NavLink>
//               <button
//                 onClick={logout}
//                 className="text-white hover:text-blue-200 transition duration-300 ease-in-out font-medium"
//               >
//                 Logout ({user.username})
//               </button>
//             </>
//           ) : (
//             <NavLink to="login">Login</NavLink>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Generic Button Component
// const Button = ({ children, onClick, primary, fullWidth, type = 'button' }) => {
//   const baseClasses = "font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
//   const primaryClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
//   const secondaryClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";
//   const widthClass = fullWidth ? "w-full" : "";

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${widthClass}`}
//     >
//       {children}
//     </button>
//   );
// };

// // Metric Card for Dashboard
// const MetricCard = ({ title, value, icon, color }) => {
//   return (
//     <div className={`${color} p-6 rounded-2xl shadow-md flex items-center space-x-4 transform transition-all duration-300 hover:scale-105`}>
//       <div className="text-5xl">{icon}</div>
//       <div>
//         <div className="text-lg font-semibold text-gray-700">{title}</div>
//         <div className="text-4xl font-bold font-inter">{value}</div>
//       </div>
//     </div>
//   );
// };


// // --- Pages ---

// // Home Page
// const HomePage = () => {
//   const { setCurrentPage } = usePage();

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-2xl w-full transform transition-all duration-500 hover:scale-105">
//         <h1 className="text-5xl font-extrabold text-gray-800 mb-6 font-inter leading-tight">
//           Welcome to Your <span className="text-blue-600">CRM Solution</span>
//         </h1>
//         <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//           Manage your customer relationships, track leads, and streamline your sales process with ease.
//           Our intuitive platform helps you focus on what matters most: growing your business.
//         </p>
//         <div className="flex justify-center space-x-4">
//           <Button onClick={() => setCurrentPage('login')} primary>
//             Get Started
//           </Button>
//           <Button onClick={() => console.log('Learn More button clicked!')}>
//             Learn More
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Login Page
// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const { setCurrentPage } = usePage();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (login(username, password)) {
//       setCurrentPage('dashboard');
//     } else {
//       setError('Invalid username or password. Try "user" / "password".');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
//           Login to Your Account
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <Button type="submit" primary fullWidth>
//             Login
//           </Button>
//         </form>
//         <p className="text-center text-gray-500 text-sm mt-6">
//           Don't have an account?{' '}
//           <button onClick={() => setCurrentPage('signup')} className="text-blue-600 hover:underline font-medium">
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// // New Signup Page
// const SignupPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const { signup } = useAuth();
//   const { setCurrentPage } = usePage();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     const result = signup(username, password);
//     if (result.success) {
//       setCurrentPage('dashboard');
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
//           Create an Account
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="signup-username" className="block text-gray-700 text-sm font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="signup-username"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="Choose a username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="signup-password" className="block text-gray-700 text-sm font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="signup-password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="Create a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirm-password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <Button type="submit" primary fullWidth>
//             Sign Up
//           </Button>
//         </form>
//         <p className="text-center text-gray-500 text-sm mt-6">
//           Already have an account?{' '}
//           <button onClick={() => setCurrentPage('login')} className="text-blue-600 hover:underline font-medium">
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// // View Profile Page
// const ViewProfilePage = () => {
//   const { selectedItem, setCurrentPage, setSelectedItem } = usePage();

//   // move useEffect to top-level and handle redirect inside it
//   useEffect(() => {
//     if (!selectedItem) {
//       setCurrentPage('dashboard');
//     }
//   }, [selectedItem, setCurrentPage]);

//   if (!selectedItem) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
//           {selectedItem.type} Profile
//         </h2>
//         <div className="space-y-4 text-lg text-gray-700">
//           <p><strong>ID:</strong> {selectedItem.id}</p>
//           <p><strong>Type:</strong> {selectedItem.type}</p>
//           <p><strong>Name:</strong> {selectedItem.name}</p>
//           <p><strong>Email:</strong> {selectedItem.email}</p>
//           <p><strong>Status:</strong> {selectedItem.status}</p>
//         </div>
//         <div className="mt-8 flex justify-center space-x-4">
//           <Button onClick={() => { setCurrentPage('editProfile'); }}>
//             Edit Profile
//           </Button>
//           <Button onClick={() => { setCurrentPage('dashboard'); setSelectedItem(null); }}>
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Edit Profile Page
// const EditProfilePage = () => {
//   const { selectedItem, setCurrentPage, setSelectedItem, updateCrmData } = usePage();
//   const [formData, setFormData] = useState(selectedItem || {});

//   useEffect(() => {
//     if (!selectedItem) {
//       setCurrentPage('dashboard');
//     } else {
//       setFormData(selectedItem);
//     }
//   }, [selectedItem, setCurrentPage]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateCrmData(formData); // Update the data in the main state
//     setSelectedItem(null); // Clear selected item
//     setCurrentPage('dashboard'); // Go back to dashboard
//   };

//   if (!selectedItem) {
//     return null; // Or a loading spinner
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
//           Edit {selectedItem.type} Profile
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               value={formData.name || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               value={formData.email || ''}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">
//               Status
//             </label>
//             <select
//               id="status"
//               name="status"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//               value={formData.status || ''}
//               onChange={handleChange}
//               required
//             >
//               <option value="New">New</option>
//               <option value="Contacted">Contacted</option>
//               <option value="Qualified">Qualified</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//           <div className="flex justify-center space-x-4 mt-8">
//             <Button type="submit" primary>
//               Save Changes
//             </Button>
//             <Button onClick={() => { setCurrentPage('dashboard'); setSelectedItem(null); }}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Dashboard Page
// const DashboardPage = () => {
//   const { user } = useAuth();
//   const { setCurrentPage, setSelectedItem, crmData } = usePage(); // Get crmData from PageContext

//   useEffect(() => {
//     // If not logged in, redirect to login page
//     if (!user) {
//       setCurrentPage('login');
//     }
//   }, [user, setCurrentPage]);

//   if (!user) {
//     return null; // Or a loading spinner, or direct redirect handled by useEffect
//   }

//   const handleView = (item) => {
//     setSelectedItem(item);
//     setCurrentPage('viewProfile');
//   };

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setCurrentPage('editProfile');
//   };

//   // Calculate metrics
//   const totalLeads = crmData.filter(item => item.type === 'Lead').length;
//   const totalCustomers = crmData.filter(item => item.type === 'Customer').length;
//   const newLeadsToday = crmData.filter(item => item.type === 'Lead' && item.status === 'New').length; // Assuming 'New' means new today for simulation

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto bg-white p-8 rounded-2xl shadow-xl">
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
//           CRM Dashboard
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <MetricCard title="Total Leads" value={totalLeads} icon="📊" color="bg-blue-100 text-blue-800" />
//           <MetricCard title="Total Customers" value={totalCustomers} icon="🤝" color="bg-green-100 text-green-800" />
//           <MetricCard title="New Leads Today" value={newLeadsToday} icon="✨" color="bg-yellow-100 text-yellow-800" />
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {crmData.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                       ${item.type === 'Lead' ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'}`}>
//                       {item.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                       ${item.status === 'New' ? 'bg-red-100 text-red-800' :
//                         item.status === 'Contacted' ? 'bg-orange-100 text-orange-800' :
//                         item.status === 'Qualified' ? 'bg-lime-100 text-lime-800' :
//                         'bg-green-100 text-green-800'}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleView(item)}
//                       className="text-blue-600 hover:text-blue-900 mr-4 transition duration-150 ease-in-out"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };


// // Main App Component
// const App = () => {
//   const { currentPage } = usePage();

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'home':
//         return <HomePage />;
//       case 'login':
//         return <LoginPage />;
//       case 'signup':
//         return <SignupPage />;
//       case 'dashboard':
//         return <DashboardPage />;
//       case 'viewProfile':
//         return <ViewProfilePage />;
//       case 'editProfile':
//         return <EditProfilePage />;
//       default:
//         return <HomePage />;
//     }
//   };

//   return (
//     <div className="font-sans antialiased">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//           body { font-family: 'Inter', sans-serif; }
//           .animate-underline {
//             animation: expandUnderline 0.3s forwards;
//           }
//           @keyframes expandUnderline {
//             from { transform: scaleX(0); }
//             to { transform: scaleX(1); }
//           }
//         `}
//       </style>
//       <Navbar />
//       {renderPage()}
//     </div>
//   );
// };

// // Wrap App with providers
// export default () => (
//   <PageProvider>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </PageProvider>
// );
