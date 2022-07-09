import React from 'react'
import LoginStyle from './LoginForm.module.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginForm() {
  const [submitHover, setSubmitHover] = useState(false)
  return (
    <Container style={{ height: '100vh' }} md={'fluid'}>
      <Row xs={' justify-content-center align-items-center h-100'}>
        <Col xs={"10 p-5"} md={"8"} lg={'6'} xxl={'5'} >
          <Form style={{width:'100%'}}>
            <h3  className={`mb-5 text-center ${LoginStyle.loginHeader}`}>Login</h3>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <div className={LoginStyle.form}>
                <input type="text" name="name" required autoComplete="off" />
                <label htmlFor="name" className={LoginStyle.labelName}>
                  <span className={LoginStyle.contentName}>Name</span>
                </label>
              </div>
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <div className={LoginStyle.form}>
                <input type="password" name="password" required autoComplete="off" />
                <label htmlFor="password" className={LoginStyle.labelName}>
                  <span className={LoginStyle.contentName}>Password</span>
                </label>
              </div>
            </Form.Group>
            <button className={LoginStyle.subBtn} style={{ width: '100%' }} onMouseEnter={e => setSubmitHover(true)} onMouseLeave={e => setSubmitHover(false)} type="submit">
              <span className={submitHover?LoginStyle.changeSpan:''}>Submit</span>
            </button>
            <div  className='mt-3'> <span className={`${LoginStyle.bottomLink}`} >Don't have an account ? <Link to='/signup'>Signup</Link></span> </div>
           
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
