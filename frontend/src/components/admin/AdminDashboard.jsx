import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card, Form, InputGroup, FormGroup, Button, FormControl, Container, Table } from 'react-bootstrap';
import axios from 'axios'
import moment from 'moment';
import url from '../BaseUrl';
import './adminDashboard.css';

export default function AdminDashboard() {

    const [imageUrl, setURL] = useState([]);

    let [show, setShow] = useState();
    const [data, setData] = useState([]);
    const [valid, setValid] = useState('');

    const meterReading = useRef();
    const fuelPricePerLiter = useRef();
    const fuelRupees = useRef();
    const fuelInLiters = useRef();


    useEffect(() => {
        axios({
            method: "get",
            url: url + "/adminGetPhotoData",
            withCredentials: true
        }).then((res) => {
            console.log("getPhotoData ===> : ", res.data.data);
            setURL(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        return () => {
            console.log("cleanup");
        }
    }, [])

    const handlePrice = () => {
        let fuelRate = fuelPricePerLiter.current.value;
        let liter = fuelInLiters.current.value;
        let showPrice = fuelRate * liter;
        return fuelRupees.current.value = showPrice.toFixed(2);
    }

    const handleLiter = () => {
        let fuelRate = fuelPricePerLiter.current.value;
        let rupees = fuelRupees.current.value;
        let showLiter = rupees / fuelRate;
        return fuelInLiters.current.value = showLiter.toFixed(2);
    }

    function updateStatus(id) {
        console.log("Id ===>", id)
        axios({
            method: 'post',
            url: url + '/updateStatus',
            data: {
                id: id,
                meterReading: meterReading.current.value,
                fuelPricePerLiter: fuelPricePerLiter.current.value,
                fuelRupees: fuelRupees.current.value,
                fuelInLiters: fuelInLiters.current.value,
                status: "Process Complete"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
            {imageUrl.map((eachItem, index) => {
                return (
                    <Row key={index}>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Meter Photo</th>
                                    <th>Fuel Photo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <div className="admin-file-upload" >
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={eachItem.meterReadingImage}
                                                alt={""}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="admin-file-upload" >
                                            <img
                                                width={64}
                                                height={64}
                                                className="mr-3"
                                                src={eachItem.fuelReadingImage}
                                                alt={""}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Form onSubmit={(e) => { e.preventDefault(); updateStatus(eachItem._id)}}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Meter Reading</Form.Label>
                                                    <Form.Control type="number" placeholder="Meter Reading" ref={meterReading} autoFocus required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Fule Rate</Form.Label>
                                                    <Form.Control type="float" placeholder="Fuel Rate" ref={fuelPricePerLiter} required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>Fuel Rupees</Form.Label>
                                                    <Form.Control type="float" placeholder="Total Rupees" onChange={handleLiter} ref={fuelRupees} required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>Fuel In Liters</Form.Label>
                                                    <Form.Control type="float" placeholder="Fuel In Liters" onChange={handlePrice} ref={fuelInLiters} required />
                                                </Form.Group>

                                            </Form.Row>

                                            <center>
                                                <Button variant="dark" type="submit" >Submit</Button>
                                            </center>

                                        </Form>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                )
            })}
        </Container>
    )
}
