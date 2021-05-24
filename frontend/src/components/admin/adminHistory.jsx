import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Form, InputGroup, FormGroup, Button, FormControl, Container, Table } from 'react-bootstrap';
import axios from 'axios'
import moment from 'moment';
import url from '../BaseUrl';
import './adminDashboard.css';

export default function AdminDashboard() {

    const [imageUrl, setURL] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: url + "/adminHistory",
            withCredentials: true
        }).then((res) => {
            console.log("getHistory ===> : ", res.data.data);
            setURL(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
        return () => {
            console.log("cleanup");
        }
    }, [])

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Admin History</h1>
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
                                        <Form>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Meter Reading</Form.Label>
                                                    <Form.Control type="number" placeholder="Meter Reading" value={eachItem.meterReading} readOnly required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Fule Rate</Form.Label>
                                                    <Form.Control type="float" placeholder="Fuel Rate" value={eachItem.fuelPricePerLiter} readOnly required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>Fuel Rupees</Form.Label>
                                                    <Form.Control type="float" placeholder="Total Rupees" value={eachItem.fuelRupees} readOnly required />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>Fuel In Liters</Form.Label>
                                                    <Form.Control type="float" placeholder="Fuel In Liters" value={eachItem.fuelInLiters} readOnly required />
                                                </Form.Group>

                                            </Form.Row>
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
