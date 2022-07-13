import React, { useEffect } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import Style from './LatestApp.module.css'

import { useContext } from 'react';
import { ContextLoader } from '../../Contexts/LoaderContext';
import { useState } from 'react';
import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';



function LatestApp() {


  const [form, setForm] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {

    setShow(true);
  }
  const approveClick = (id) => {
    fetch('http://localhost:8080/admin/approve', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }
  const rejectClick = (id) => {
    fetch('http://localhost:8080/admin/reject', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }
  $(document).ready(function () {
    setTimeout(function () {
      $('#table').DataTable();
    }, 1000);
  })

  const { setLoading } = useContext(ContextLoader)
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8080/admin/getadmin', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      const data = await res.json()
      setData(data.response)
      setLoading(false)
    })
  }, []);



  return (
    <div className={`container ${Style.hero}`}>
      <div className={`border {Style.tableHero}`}>
        <h1 className='mb-5'>Latest</h1>
        <table id='table' style={{ padding: '5px 5px' }} id="table" className="table table-hover table-borderless table-stripe">
          <thead>
            <tr>
              <th>No.</th>
              <th>Company</th>
              <th>View</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.application && item.application.company}</td>
                  <td><button onClick={e => {
                    setForm(item)
                    handleShow()
                  }}>View</button></td>
                  <td><button className='btn btn-success' onClick={e => { approveClick(item._id) }} >Approve</button></td>
                  <td><button className='btn btn-danger' onClick={rejectClick}>Reject</button></td>
                </tr>
              )

            })}

          </tbody>

        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form &&
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="name"></label>
                    <input disabled className='form-control' type="text" name='name' value={form.name} />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="name"></label>
                    <input disabled className='form-control' type="text" name='name' value={form.name} />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="email"></label>
                    <input disabled className='form-control' type="text" name='email' value={form.email} />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="phone"></label>
                    <input disabled className='form-control' type="text" name='phone' value={form.phone} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="company"></label>
                    <input disabled className='form-control' type="text" name='company' value={form.application.company} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="city"></label>
                    <input disabled className='form-control' type="text" name='city' value={form.application.city} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="local"></label>
                    <input disabled className='form-control' type="text" name='local' value={form.application.local} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="state"></label>
                    <input disabled className='form-control' type="text" name='state' value={form.application.state} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="teamAndBackground"></label>
                    <textarea disabled type="text" className='form-control' name='teamAndBackground' value={form.application.teamAndBackground} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="companyAndProducts"></label>
                    <textarea disabled type="text" className='form-control' name='companyAndProducts' value={form.application.companyAndProducts} />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="problem"></label>
                    <textarea disabled type="text" className='form-control' name='problem' value={form.application.problem} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="solution"></label>
                    <textarea disabled type="text" className='form-control' name='solution' value={form.application.solution} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="propositon"></label>
                    <textarea disabled type="text" className='form-control' name='propositon' value={form.application.propositon} />
                  </div>
                </div>
              </div>
            </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>



  )
}

export default LatestApp
