import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col, } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from 'axios'
import "../App.css"

export default function EmployeeDetails() {

    const [employee, setEmployee] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:9090/api/v1/employees/${id}`)
        .then(response => {
            setEmployee(response.data)
            console.log(employee.firstName)
        }).catch(err => console.log(err))
    }, []);

    
    return (
        <>
            <Container>
                <Container className="text-center mt-4 mb-4"><h3><b>Employee Details</b></h3></Container>
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
                    <Card className="border-4 border-primary shadow text-center">
                        <Card.Body>
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
                            <br/>
                            <Button className="btn btn-success" href={`/employees/update/${id}`}>Update This Employee</Button>{' '}
                            <Button className="btn btn-danger" href={`/`}>Back to Employee List</Button>{' '}
                        </Card.Body>
                    </Card>
                }
                
            </Container>
        </>
    )
}
