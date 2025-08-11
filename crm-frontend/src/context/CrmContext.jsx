import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const CrmContext = createContext(null)

export const CrmProvider = ({ children }) => {
  const [crmData, setCrmData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:3001/api/crm-data')
      setCrmData(res.data)
    } catch (err) {
      console.error('Failed to load crm data', err)
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchData() }, [])

  const updateItem = async (item) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/crm-data/${item.id}`, item)
      setCrmData(prev=> prev.map(i=> i.id===res.data.id ? res.data : i))
      return { success: true }
    } catch (err) { return { success:false, error: err.message } }
  }

  const createItem = async (item) => {
    try {
      const res = await axios.post('http://localhost:3001/api/crm-data', item)
      setCrmData(prev=> [...prev, res.data])
      return { success: true }
    } catch (err) { return { success:false, error: err.message } }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/crm-data/${id}`)
      setCrmData(prev=> prev.filter(i=> i.id!==id))
      return { success: true }
    } catch (err) { return { success:false, error: err.message } }
  }

  return <CrmContext.Provider value={{ crmData, loading, fetchData, updateItem, createItem, deleteItem }}>{children}</CrmContext.Provider>
}

export const useCrm = () => useContext(CrmContext)
