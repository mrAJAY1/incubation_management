import React from 'react'
import { LoginForm } from '../../components'
import Style from './LoginCTR.module.css'

function Login() {
  return (
    <div className={Style.signupContainer}>
      <div className={Style.innerContainer}>
      </div>
      <LoginForm />
    </div>

  )
}

export default Login
