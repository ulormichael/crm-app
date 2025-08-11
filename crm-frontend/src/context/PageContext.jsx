import React, { createContext, useContext, useState, useEffect } from 'react';

const PageContext = createContext(null);

const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [crmData, setCrmData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCrmData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/crm-data');
      if (response.ok) {
        const data = await response.json();
        setCrmData(data);
      } else {
        console.error('Failed to fetch CRM data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error fetching CRM data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 'dashboard') {
      fetchCrmData();
    }
  }, [currentPage]);

  const updateCrmData = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3001/api/crm-data/${updatedItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      if (response.ok) {
        fetchCrmData();
      } else {
        console.error('Failed to update CRM data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error updating CRM data:', error);
    }
  };

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, selectedItem, setSelectedItem, crmData, setCrmData, updateCrmData, isLoading }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => useContext(PageContext);

export { PageProvider, usePage };

// ---