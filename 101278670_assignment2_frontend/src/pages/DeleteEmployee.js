import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Form, Row, Col, } from "react-bootstrap";
import { useParams, useNavigate, } from "react-router-dom";
import axios from 'axios'
import "../App.css"


export default function DeleteEmployee() {
    const [employee, setEmployee] = useState([])

    let {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9090/api/v1/employees/${id}`)
        .then(res => { setEmployee(res.data) })
        .catch(error => console.log(error))
    }, []);

    const deleteEmployee = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:9090/api/v1/employees/${id}`)
        .then(res => {
            console.log(res.data)
            alert("Employee successfully deleted!")
            navigate('/')
        })
        .catch(err => console.log(err))
       
    }


    return (
        <>
            <Container>
                <Container className="text-center mt-4 mb-4"><h3><b>Delete Employee</b></h3></Container>
                {employee.length === 0 &&
                    <Card className="border-4 border-danger shadow">
                        <Card.Body>
                            <Row className="text-center">
                                <h1><strong>There are no Employees with the ID: {id}</strong></h1>
                            </Row>
                        </Card.Body>
                    </Card>
                }
                {employee.length !== 0 &&
                    <Card className="border-4 border-danger shadow text-center">
                        <Card.Body>
                            <Form onSubmit={deleteEmployee} action="">
                                <Card.Title><h2><strong>Are You Sure You Want To Delete This Employee?</strong></h2></Card.Title>
                                <hr/>
                                <Row className="d-flex justify-content-center">
                                    <Col className="text-lg-end" md="5"><h4><strong>Employee ID:</strong></h4></Col>
                                    <Col md="5"><h4 className="text-lg-start">{employee.id}</h4></Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Col className="text-lg-end" md="5"><h4><strong>Full Name:</strong></h4></Col>
                                    <Col md="5"><h4 className="text-lg-start">{employee.firstName} {employee.lastName}</h4></Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <Col className="text-lg-end" md="5"><h4><strong>Email:</strong></h4></Col>
                                    <Col md="5"><h4 className="text-lg-start">{employee.emailId}</h4></Col>
                                </Row>
                                <br />
                                <Button className="btn btn-danger" type="submit">Delete</Button>{' '}
                                <Button className="btn btn-secondary" href={`/`}>Cancel</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                }
            </Container>
        </>
    )
}