import React from 'react'
import { ApplicationForm } from '../../components'
import Style from './applicationCTR.module.css'

function applicationCTR() {
  return (
    <div className={Style.applicationCTR}>
      <ApplicationForm/>
    </div>
  )
}

export default applicationCTR
