import React, { useState, useEffect } from 'react'
import { Card, Container, Button, Row, Col, Form, } from "react-bootstrap";
import axios from 'axios'
import { useNavigate, useParams, } from "react-router-dom";

export default function AddEmployee() {
    const navigate = useNavigate();
    let { id } = useParams()
    const [newId, setID] = useState('')
    const [firstName, setFN] = useState('')
    const [lastName, setLN] = useState('')
    const [emailId, setEID] = useState('')

    useEffect(() => {
        if (id !== undefined) {
            axios.get(`http://localhost:9090/api/v1/employees/${id}`)
                .then(res => {
                    console.log(res.data)
                    setID(res.data.id)
                    setFN(res.data.firstName)
                    setLN(res.data.lastName)
                    setEID(res.data.emailId)
                }).catch(err => console.log(err))
        }
    }, []);

    async function getId() {
        return axios.get(`http://localhost:9090/api/v1/employees/${newId}`).then(res => res.data.id)
    }

    let submitForm = (e) => {
        e.preventDefault();
        const data = {
            "id": newId,
            "firstName": firstName,
            "lastName": lastName,
            "emailId": emailId
        }
        getId().then(tempId => {
            let check = tempId !== undefined && tempId !== "" && tempId !== null;
            if (id !== undefined) {
                if (("" + id === "" + newId)) check = false;
            }
            if (check) {
                alert("Employee with ID '" + newId + "' already exists!");
                return false;
            }
            if (id !== undefined) {
                alert("Employee successfully updated!")
                axios.put(`http://localhost:9090/api/v1/employees/${id}`, data).then(res => navigate('/')).catch(err => console.log(err));
            }
        }).catch(err => {
            console.log(err)
            if (err.response.status === 404) {
                if (id === undefined) {
                    alert("Employee successfully added!")
                    axios.post("http://localhost:9090/api/v1/employees", data).then(res => navigate('/')).catch(err => console.log(err));
                }
                else {
                    alert("Employee successfully updated!")
                    axios.put(`http://localhost:9090/api/v1/employees/${id}`, data).then(res => navigate('/')).catch(err => console.log(err));
                }
            }
        });
    }


    return (
        <>
            <Container className="justify-content-center w-50">
                {id === undefined && <Container className="text-center mt-4 mb-4"><h3><b>Add Employee</b></h3></Container>}
                {id !== undefined && <Container className="text-center mt-4 mb-4"><h3><b>Update Employee</b></h3></Container>}
                <Card className="border-4 border-success shadow">
                    <Card.Body className="text-center">
                        <Form onSubmit={submitForm} method="POST" action="http://localhost:9090/api/v1/employees">
                            <Row className="d-flex justify-content-center">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3"><h5 style={{ textAlign: 'right' }}>ID:</h5></Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="text" name="newId" value={newId} onChange={e => setID(e.target.value)} required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mt-3">
                                    <Form.Label className="flex-end" column sm="3"><h5 style={{ textAlign: 'right' }}>First Name:</h5></Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="text" name="firstName" value={firstName} onChange={e => setFN(e.target.value)} required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mt-3">
                                    <Form.Label className="flex-end" column sm="3"><h5 style={{ textAlign: 'right' }}>Last Name:</h5></Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="text" name="lastName" value={lastName} onChange={e => setLN(e.target.value)} required />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mt-3 mb-4">
                                    <Form.Label className="flex-end" column sm="3"><h5 style={{ textAlign: 'right' }}>Email:</h5></Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="email" name="emailId" value={emailId} onChange={e => setEID(e.target.value)} required />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Button variant="success" type="submit">Submit</Button> {' '}
                            <Button variant="danger" type="cancel" href="/">Cancel</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
