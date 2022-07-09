import React from 'react'
import { SignupForm } from '../../components'
import Style from './SignupCTR.module.css'
function Signup() {
  return (
    <div className={Style.signupContainer}>
      <div className = {Style.innerContainer}>
      </div>
              <SignupForm />
    </div>
   
  )
}

export default Signup
