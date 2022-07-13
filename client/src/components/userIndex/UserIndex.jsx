import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Loader } from '..'
import { logout } from '../../constants/functions'
import Style from './UserIndex.module.css'
function UserIndex() {
  const navigate = useNavigate()

  const [userStatus, setUserStatus] = useState()
  const [status, setStatus] = useState()
  useEffect(() => {
    fetch('http://localhost:8080/gethome', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if (res.status !== 200) {
        navigate('/login')
        return
      }
      const data = await res.json()
      setUserStatus(data.response.status)
      if (data.response.status === 'nil') {
        setStatus('Application not yet submitted')
      } else {
        setStatus(data.response.status)
      }
    })
  }, []);
  return (
    <><Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>User</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className={Style.Hero}>
        <div style={{ display: 'flex', flexDirection: "column", border: '1px solid aqua', height: "250px", width: '200px' }}>
          <div style={{ position: 'relative', width: "100%", height: '60%' }}>
            <Loader />
          </div>
          <h5 className='text-center' style={{ height: '20%' }}>{status}</h5>
          {
            userStatus === 'nil' ? <button onClick={e => { navigate('/application') }} className='btn btn-primary'>
              Register
            </button> : userStatus === 'rejected' ? <button onClick={navigate('/application')} className='btn btn-primary'>
              Register again
            </button> : userStatus === 'pending' ? <button onClick={e => window.alert('submition pending')} className='btn btn-success'>
              admin will check and approve your request            </button> : userStatus === 'approved' ? <button onClick={e => { alert('already approved') }} className='btn btn-success'>approved</button> : ''
          }

        </div>
      </div></>

  )
}

export default UserIndex
