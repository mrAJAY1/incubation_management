import React, { useContext, useEffect } from 'react'
import LoginStyle from './LoginForm.module.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextLoader } from '../../Contexts/LoaderContext'
function LoginForm() {
  const initialValues = { password: '', email: '' }
  const [formValue, setFormValues] = useState(initialValues);
  const [formErr, setFormErr] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitHover, setSubmitHover] = useState(false)
  const { setLoading } = useContext(ContextLoader)

  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValue, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErr(validate(formValue))
    setSubmitted(true)
  }
  const validate = (formValue) => {
    const error = {}
    const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!formValue.email) error.email = 'email is required'
    else if (!regEmail.test(formValue.email)) error.email = 'invalid email format'
    return error
  }

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && submitted) {
      setLoading(true)
      fetch('http://localhost:8080/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          email: formValue.email,
          password: formValue.password
        })
      }).then(async res => {
        if (res.status === 200) {
          navigate('/')
        }
        if (res.status === 409) {
          const data = await res.json()
          setFormErr({ ...formErr, email: data.message })
        }
        setTimeout(() => {
          setLoading(false)
        }, 800);
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }, [formErr]);


  return (
    <Container style={{ height: '100vh' }} md={'fluid'}>
      <Row xs={' justify-content-center align-items-center h-100'}>
        <Col xs={"10 p-5"} md={"8"} lg={'6'} xxl={'5'} >
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <h3 className={`mb-5 text-center ${LoginStyle.loginHeader}`}>Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className={LoginStyle.form}>
                <input type="email" name="email" required autoComplete="off" minLength={3} onChange={handleChange} />
                <label htmlFor="email" className={LoginStyle.labelName}>
                  <span style={formValue.email !== '' ? { transform: 'translateY(-110%)' } : {}} className={LoginStyle.contentName}>Email</span>
                </label>
              </div>
            </Form.Group>
            {typeof formErr.email !== 'undefined' && <p style={{position:'relative'}} className={LoginStyle.error}>{formErr.email}</p>}

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <div className={LoginStyle.form}>
                <input type="password" minLength={6} name="password" onChange={handleChange} required autoComplete="off" />
                <label htmlFor="password" className={LoginStyle.labelName}>
                  <span style={formValue.password !== '' ? { transform: 'translateY(-110%)' } : {}} className={LoginStyle.contentName}>Password</span>
                </label>
              </div>
            </Form.Group>
            <button className={LoginStyle.subBtn} style={{ width: '100%' }} onMouseEnter={e => setSubmitHover(true)} onMouseLeave={e => setSubmitHover(false)} type="submit">
              <span className={submitHover ? LoginStyle.changeSpan : ''}>Submit</span>
            </button>
            <div className='mt-3'> <span className={`${LoginStyle.bottomLink}`} > Don't have an account ? <Link to='/signup'>Signup</Link></span> </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
