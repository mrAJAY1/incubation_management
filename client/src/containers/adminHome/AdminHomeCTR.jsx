import React, { useEffect } from 'react'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Slot } from '../../../../server/Model'
import { SideBar } from '../../components'
import RecordList from '../../components/RecordList/RecordList'
import DashboardCTR from '../dashboard/DashboardCTR'

function AdminHomeCTR() {
  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://localhost:8080/admin/getadmin',{
      method:'GET',
      credentials:'include',
      Accept:'application/json',
      'Content-Type':'application/json'
    }).then(async res=>{
      const data = await res.json()
      if(res.status===401){
        navigate('/login')
        return
      }
      if(data.status!=='success'){
        navigate('/login')
        return
      }
    })
  }, []);
  return (
    <div >
      <SideBar />
      <div style={{ height: "100vh", overflowY: 'auto', overflowX: 'hidden' }}>
        <Routes>
          <Route exact path='/progress' element={<RecordList/>}/>
          <Route path='/dashboard' element={<DashboardCTR />} />
          <Route path='/slots' element={<Slot/>}/>
        </Routes>
      </div>



    </div>
  )
}

export default AdminHomeCTR
