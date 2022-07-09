import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import SignupStyle from './SignupForm.module.css'
import { Link } from 'react-router-dom'
function SignupForm() {
    const [submitHover, setSubmitHover] = useState(false)
    return (
        <Container style={{ height: '100vh' }} md={'fluid'}>
            <Row xs={' justify-content-center align-items-center h-100'}>
                <Col xs={"10 p-5"} md={"8"} lg={'6'} xxl={'5'} >
                    <Form style={{ width: '100%' }}>
                        <div> <h3 className={`mb-5 text-center ${SignupStyle.loginHeader}`}>Signup</h3></div>
                       
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="text" name="name" required autocomplete="off" />
                                <label for="name" className={SignupStyle.labelName}>
                                    <span class={SignupStyle.contentName}>Name</span>
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="text" name="email" required autocomplete="off" />
                                <label for="email" className={SignupStyle.labelName}>
                                    <span class={SignupStyle.contentName}>Email</span>
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <div className={SignupStyle.form}>
                                <input type="number" id='phone' name="phone" required autocomplete="off" />
                                <label for="phone" className={SignupStyle.labelName}>
                                    <span class={SignupStyle.contentName}>Phone</span>
                                </label>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <div className={SignupStyle.form}>
                                <input type="password" name="password" required autocomplete="off" />
                                <label for="name" className={SignupStyle.labelName}>
                                    <span className={SignupStyle.contentName}>Password</span>
                                </label>
                            </div>
                        </Form.Group>
                        <button className={SignupStyle.subBtn} style={{ width: '100%' }} onMouseEnter={e => setSubmitHover(true)} onMouseLeave={e => setSubmitHover(false)} type="submit">
                            <span className={submitHover?SignupStyle.changeSpan:''}>Submit</span>
                        </button>
                        <div className='mt-3'> <small className={`${SignupStyle.bottomLink}`} >Already have an account ? <Link to='/login'>Login</Link></small> </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupForm
