import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextLoader } from '../../Contexts/LoaderContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Slots() {
    const { setLoading } = useContext(ContextLoader)
    const [sectionA, setSectionA] = useState([])
    const [sectionB, setSectionB] = useState([])
    const [sectionC, setSectionC] = useState([])
    const [sectionD, setSectionD] = useState([])
    const [slotId, setSlotId] = useState()
    const [slotSelection, setSlotSelection] = useState()
    const [applicantList, setApplicantList] = useState()
    const [allsection,setallsection] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id, section) => {
        setSlotId(id)
        setSlotSelection(section)
        setShow(true)

    };
    const slotBooking = (value) => {
        console.log(slotId)
        console.log(slotSelection)
        console.log(value)
        
        fetch('http://localhost:8080/admin/bookslot', {
            credentials: 'include',
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: slotId,
                uId: value,
                section: slotSelection
            })
        }).then(async res => {

            if (res.status !== 200) {
                navigate('/login')
            }
        })
    }
    const applicants = async () => {
        fetch('http://localhost:8080/admin/getapproved', {
            credentials: 'include',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            const data = await res.json()
            setApplicantList(data.response)
        })
    }

    const navigate = useNavigate()
    const displaySlots = async () => {
        setLoading(true)
        fetch('http://localhost:8080/admin/getslots', {
            credentials: 'include',
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            if (res.status !== 200) {
                navigate('/login')
                setLoading(false)
                return
            }
            const data = await res.json()
            setallsection(data.response)
            setSectionA(data.response.filter((item) => {
                return (item.section === 'A')
            }))
            setSectionB(data.response.filter((item) => {
                return (item.section === 'B')
            }))
            setSectionC(data.response.filter((item) => {
                return (item.section === 'C')
            }))
            setSectionD(data.response.filter((item) => {
                return (item.section === 'D')
            }))
            setLoading(false)
        })
    }
    useEffect(() => {
        displaySlots()
        applicants()
    }, []);
    return (
        <div className='container'>
            <div className="row my-3 justify-content-around">
                {sectionA.map(item => {
                    return (
                        <div onClick={e => handleShow(item.slot, item.section)} className={item.isBooked? ` col-sm-1 bg-success col-2 my-2 mx-2`:` col-sm-1 my-2 bg-secondary col-2 mx-2 `}>
                            <div style={{ width: "100%", height: '80px' }}  ></div>
                        </div>
                    )
                })}

            </div>
            <div className="row my-3 justify-content-around">
                {sectionB.map(item => {
                    return (
                        <div onClick={e => handleShow(item.slot, item.section)} className={item.isBooked? ` col-sm-1 bg-success col-2 my-2 mx-2`:` col-sm-1 my-2 bg-secondary col-2 mx-2`}>
                            <div style={{ width: "100%", height: '80px' }}  ></div>
                        </div>
                    )
                })}

            </div>
            <div className="row my-3 justify-content-around">
                {sectionC.map(item => {
                    return (
                        <div onClick={e => handleShow(item.slot, item.section)} className={item.isBooked? ` col-sm-1 bg-success my-2 col-2 mx-2`:` col-sm-1 my-2 bg-secondary col-2 mx-2`}>
                            <div style={{ width: "100%", height: '80px' }}  ></div>
                        </div>
                    )
                })}

            </div>
            <div className="row my-3 justify-content-around">
                {sectionD.map(item => {
                    return (
                        <div onClick={e => handleShow(item.slot, item.section)} className={item.isBooked? ` col-sm-1 bg-success col-2 my-2 mx-2`:` col-sm-1 my-2 bg-secondary col-2 mx-2`}>
                            <div style={{ width: "100%", height: '80px' }}  ></div>
                        </div>
                    )
                })}

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(e) => {
                        slotBooking(e.target.value)
                    }}>
                        <option selected>no selection</option>
                        {applicantList && applicantList.map(items => {

                            return (
                                <option value={items._id} >{items.application.company}</option>
                            )
                        })}

                    </select>
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

export default Slots
