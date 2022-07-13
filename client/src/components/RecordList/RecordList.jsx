import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Progress_bar from '../ProgressBar/ProgressBar';






function RecordList() {



    const [recordList, setRecordList] = useState([])

    const navigate = useNavigate()

    let index = 1



    async function displayRecordList() {
        const req = await fetch('http://localhost:8080/admin/reports',{
            credentials:'include',  
        })

        const response = await req.json()

        let result = response.response
        // 

        setRecordList(result)

        // console.log(recordList);
    }


    $(document).ready(function () {
        setTimeout(function () {
            $('#example').DataTable();
        }, 1000);
    });




    useEffect(() => {
        displayRecordList()
    }, [recordList])







    return (
        <div>
            {recordList &&
                <div className="MainDiv">
                    <div className="jumbotron text-center">
                        <h3 className='mt-5'>RECORD LIST</h3>
                    </div>

                    <div className="container shadow">

                        <table id="example" className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Company Name</th>
                                    <th>Company Details</th>
                                    <th>Applicaton Progress</th>
                                     
                                </tr>
                            </thead>
                            <tbody>
                                {recordList.map((result) => {
                                    return (

                                        <tr>
                                            <td> {index++}</td>
                                            <td>{result.companyName}</td>
                                            <td>
                                                <label>Address :{result.address}</label><br />
                                                <label  >Email :{result.email}</label><br />
                                                <label  >Phone :{result.phone}</label><br />
                                            </td>
                                            <td> 
                                                <Progress_bar   status={result.status}   />
                                            </td>
                                             


                                        </tr>

                                    )
                                })}


                            </tbody>
                        </table>

                    </div>
                </div>}
        </div>
    )
}

export default RecordList