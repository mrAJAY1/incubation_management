import React, { useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import SignupStyle from './SignupForm.module.css'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthBar from "react-password-strength-bar"
import { useContext } from 'react'
import { ContextLoader } from '../../Contexts/LoaderContext'
function SignupForm() {
    const initialValues = { name: '', password: '', phone: '', email: '' }
    const [formValue, setFormValues] = useState(initialValues);
    const [formErr, setFormErr] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [submitHover, setSubmitHover] = useState(false)
    const { setLoading } = useContext(ContextLoader)
    const navigate = useNavigate()
    const handleChange = e => {
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
        const regName = /^[a-zA-Z ]{2,30}$/

        if (!formValue.name) error.name = 'name is required'
        else if (!regName.test(formValue.name)) error.name = 'Invalid name format'
        if (!formValue.email) error.email = 'email is required'
        else if (!regEmail.test(formValue.email)) error.email = 'invalid email format'
        if (!formValue.phone) error.phone = 'number is required'
        else if (formValue.phone.length < 10 || formValue.phone.length > 10) error.phone = 'enter a valid number'
        return error
    }

    useEffect(() => {
        if (Object.keys(formErr).length === 0 && submitted) {
            setLoading(true)
            fetch('http://localhost:8080/signup', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: formValue.name,
                    email: formValue.email,
                    phone: formValue.phone,
                    password: formValue.password

                })
            }).then(async res => {
                if (res.status === 200) {
                    navigate('/')
                    return
                }
                if (res.status === 409) {
                    const data = await res.json()
                    setFormErr({ ...formErr, email: data.message })
                    setTimeout(() => {
                        setLoading(false)
                    }, 500);
                }


            }).catch((err) => {
                console.log(err.message)
            })
        }
    }, [formErr]);

    return (
        <Container style={{ height: '100vh' }} md={'fluid'}>
            <Row xs={' justify-content-center align-items-center h-100'}>

                <Col xs={"10 p-5"} md={"8"} lg={'6'} xxl={'5'} >

                    <Form onSubmit={handleSubmit} style={{ width: '100%', position: 'relative' }}>
                        <div> <h3 className={`mb-5 text-center ${SignupStyle.loginHeader}`}>Signup</h3>

                        </div>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="text" name="name" value={formValue.name} required autoComplete="off" onChange={handleChange} />
                                <label htmlFor="name" className={SignupStyle.labelName}>
                                    <span className={SignupStyle.contentName}>Name</span>
                                </label>
                            </div>
                            {typeof formErr.name !== 'undefined' && <p className={SignupStyle.error}>{formErr.name}</p>}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="text" name="email" value={formValue.email} required autoComplete="off" onChange={handleChange} />
                                <label htmlFor="email" className={SignupStyle.labelName}>
                                    <span className={SignupStyle.contentName}>Email</span>
                                </label>
                            </div>
                            {typeof formErr.email !== 'undefined' && <p className={SignupStyle.error}>{formErr.email}</p>}
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="number" id='phone' value={formValue.phone} name="phone" required autoComplete="off" onChange={handleChange} />
                                <label htmlFor="phone" className={SignupStyle.labelName}>
                                    <span className={SignupStyle.contentName}>Phone</span>
                                </label>
                            </div>
                            {typeof formErr.phone !== 'undefined' && <p className={SignupStyle.error}>{formErr.phone}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <div className={SignupStyle.form} >
                                <input type="password" name="password" value={formValue.password} required minLength={6} autoComplete="off" onChange={handleChange} />
                                <label htmlFor="name" className={SignupStyle.labelName}>
                                    <span className={SignupStyle.contentName}>Password</span>
                                </label>

                            </div>
                            {formValue.password !== '' ? <PasswordStrengthBar className={SignupStyle.strengthBar} password={formValue.password} /> : <PasswordStrengthBar className={SignupStyle.strengthBar} style={{ opacity: '0%' }} />}

                        </Form.Group>
                        <button className={SignupStyle.subBtn} style={{ width: '100%' }} onMouseEnter={e => setSubmitHover(true)} onMouseLeave={e => setSubmitHover(false)} type="submit">
                            <span className={submitHover ? SignupStyle.changeSpan : ''}>Submit</span>
                        </button>
                        <div className='mt-3'> <small className={`${SignupStyle.bottomLink}`} >Already have an account ? <Link to='/login'>Login</Link></small> </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupForm
