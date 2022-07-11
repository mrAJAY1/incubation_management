import React from 'react'
import { Loader, SignupForm } from '../../components'
import Style from './SignupCTR.module.css'
function Signup() {
  return (
    <div className={Style.signupContainer}>
      <div className={Style.innerContainer}></div>
      <div style={{zIndex:'100',width:'100%'}}>
        <SignupForm />
      </div>
      
    </div>

  )
}

export default Signup
