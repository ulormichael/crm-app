import React, { createContext, useContext, useState, useEffect } from 'react';

// --- Page Routing Context ---
const PageContext = createContext(null);

const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // Default page
  const [selectedItem, setSelectedItem] = useState(null); // To store the lead/customer being viewed/edited
  
  // A simple counter for new item IDs
  const [nextId, setNextId] = useState(6);

  // Simulated CRM Data
  const [crmData, setCrmData] = useState([
    { id: 1, type: 'Lead', name: 'Alice Johnson', email: 'alice@example.com', status: 'New' },
    { id: 2, type: 'Customer', name: 'Bob Williams', email: 'bob@example.com', status: 'Active' },
    { id: 3, type: 'Lead', name: 'Charlie Davis', email: 'charlie@example.com', status: 'Contacted' },
    { id: 4, type: 'Customer', name: 'Diana Miller', email: 'diana@example.com', status: 'Active' },
    { id: 5, type: 'Lead', name: 'Eve Brown', email: 'eve@example.com', status: 'Qualified' },
  ]);

  // Function to update CRM data after editing
  const updateCrmData = (updatedItem) => {
    setCrmData(prevData =>
      prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Function to add a new CRM item
  const addCrmItem = (newItem) => {
    const itemWithId = { ...newItem, id: nextId };
    setCrmData(prevData => [...prevData, itemWithId]);
    setNextId(prevId => prevId + 1);
  };

  // Function to delete a CRM item
  const deleteCrmItem = (itemId) => {
    setCrmData(prevData => prevData.filter(item => item.id !== itemId));
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, selectedItem, setSelectedItem, crmData, setCrmData, updateCrmData, addCrmItem, deleteCrmItem }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => useContext(PageContext);

export { PageProvider, usePage };
export default PageContext;