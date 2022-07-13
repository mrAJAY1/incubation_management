import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import Style from '../applicationForm/applicationForm.module.css'
function ApplicationForm() {
    const [form , setForm] = useState({})
    const changeHandler = (e) => {
        const {name,value} = e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const id = localStorage.getItem("id")
        const response = await fetch(`http://localhost:8080/submit_form/${id}`,{
            method:'POST',
            credentials:'include',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
        })
    }
    
    return (
        <div className='container'>
            <h2 className={`text-center mt-3 mb-5 ${Style.headerText}`}>Application Form</h2>
            <form class="form-horizontal" onSubmit={handleSubmit}>
                <div className="row ">
                    <div class="col-md-6 mb-5">
                    <div class={`form-group mb-4 ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10 col-md-8">Phone no.<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10 col-md-8">
                                <input type="number"  minLength={10} maxLength={10} value={form.phone} onChange={changeHandler} name='phone' class="form-control" />
                            </div>
                        </div>
                        <div class={`form-group mb-4 ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10 col-md-8">City<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10 col-md-8">
                                <input class="form-control" value={form.city} onChange={changeHandler}  name='city' />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-5">
                        <div class={`form-group mb-4 ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10 col-md-8">Address<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10 col-md-8">
                                <input type="text" name='address' value={form.address} onChange={changeHandler} class="form-control" />
                            </div>
                        </div>

                        <div class={`form-group mb-4 ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10 col-md-8">State<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10 col-md-8">
                                <input type="text" name='state' value={form.state} onChange={changeHandler}  class="form-control" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-5">
                       
                        <div class={`form-group mb-5 ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10 col-md-8">Company name<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10 col-md-8">
                                <input type="text" name='company'  value={form.comapanyName} onChange={changeHandler}  class="form-control" />
                            </div>
                        </div>
                    </div>
                    


                    <div class="col-sm-12 mb-5">
                        <div class={`form-group ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10">Describe Your Team and Background<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10">
                                <textarea type="text" minLength={50} value={form.teamAndBackground} onChange={changeHandler}  name='teamAndBackground' class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-5">
                        <div class={`form-group ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10">Describe your company and products<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10">
                                <textarea type="text" minLength={50}  value={form.companyAndProducts} onChange={changeHandler}  name='companyAndProducts' class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-5">
                        <div class={`form-group ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10">Describe the problem you're trying to solve<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10">
                                <textarea type="text" minLength={50}  value={form.problem} onChange={changeHandler}  name='problem' class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-5">
                        <div class={`form-group ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10">What is unique about your solution ?<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10">
                                <textarea type="text" minLength={50}  value={form.solution} onChange={changeHandler}   name='solution' class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 mb-5">
                        <div class={`form-group ${Style.groups} align-items-sm-center`}>
                            <label class="control-label col-sm-10">What is the value proposition for the customer ?<sup className={Style.asterisk}>*</sup></label>
                            <div class="col-sm-10">
                                <textarea type="text" minLength={50}  value={form.proposition} onChange={changeHandler}   name='proposition' class="form-control" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center" style={{ flexDirection: 'column' }}>
                    <div className="col-md-6 d-flex justify-content-center ">
                        <div class="text-center w-100">
                            <button className={`w-100 ${Style.buttonfx} ${Style.slideleft} ${Style.bouncein}`} id="btn-submit">Submit</button>
                        </div>
                        <input type="hidden" name="action" id="action" value="event_dialog_add_newpartnerdata" />
                    </div>

                </div>

            </form>

        </div>
    )
}



export default ApplicationForm
