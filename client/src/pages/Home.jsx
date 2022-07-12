import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomeCTR } from '../containers'
import Application from './Application'

function Home() {
  return (
    <div>
      <HomeCTR />
      <Routes>
        <Route path='/tables' element={<Application />} />
      </Routes>
    </div>
  )
}

export default Home
