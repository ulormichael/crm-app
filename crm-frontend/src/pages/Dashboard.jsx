import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePage } from '../context/PageContext';
import MetricCard from '../components/MetricCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const { setCurrentPage, setSelectedItem, crmData, isLoading } = usePage();

  useEffect(() => {
    if (!user) {
      setCurrentPage('login');
    }
  }, [user, setCurrentPage]);

  if (!user) {
    return null;
  }

  const handleView = (item) => {
    setSelectedItem(item);
    setCurrentPage('viewProfile');
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setCurrentPage('editProfile');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-700">Loading CRM data...</h2>
      </div>
    );
  }

  const totalLeads = crmData.filter(item => item.type === 'Lead').length;
  const totalCustomers = crmData.filter(item => item.type === 'Customer').length;
  const newLeadsToday = crmData.filter(item => item.type === 'Lead' && item.status === 'New').length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
          CRM Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard title="Total Leads" value={totalLeads} icon="📊" color="bg-blue-100 text-blue-800" />
          <MetricCard title="Total Customers" value={totalCustomers} icon="🤝" color="bg-green-100 text-green-800" />
          <MetricCard title="New Leads Today" value={newLeadsToday} icon="✨" color="bg-yellow-100 text-yellow-800" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {crmData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${item.type === 'Lead' ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${item.status === 'New' ? 'bg-red-100 text-red-800' :
                        item.status === 'Contacted' ? 'bg-orange-100 text-orange-800' :
                        item.status === 'Qualified' ? 'bg-lime-100 text-lime-800' :
                        'bg-green-100 text-green-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleView(item)}
                      className="text-blue-600 hover:text-blue-900 mr-4 transition duration-150 ease-in-out"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// ---