import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SideBar } from '../../components'
import { Application } from '../../pages'
import Signup from '../signup/Signup'
function HomeCTR() {
    return (
        <>
            <SideBar />
            <Routes>
                <Route path='/dashboard' element={<Signup/>}/>
            </Routes>
        </>
    )
}

export default HomeCTR
