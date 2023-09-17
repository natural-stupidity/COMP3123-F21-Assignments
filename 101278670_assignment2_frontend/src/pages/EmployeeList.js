import React, { Component } from 'react'
import { Container, Button, Row, Table, } from "react-bootstrap";
import axios from 'axios';
import '../App.css';

export default class EmployeesList extends Component {
    state = {
        employees: []
    }

    componentDidMount() {
        axios.get(`http://localhost:9090/api/v1/employees`)
        .then(res => {
            console.log(res.data);
            const employees = res.data;
            this.setState({ employees });
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Container>
                    <Container className="text-center mt-4 mb-4"><h3><b>Employee List</b></h3></Container>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr className="text-center">
                                    <th className="col-md-2">First Name</th>
                                    <th className="col-md-2">Last Name</th>
                                    <th className="col-md-2">Email</th>
                                    <th className="col-md-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.map(employee => (
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td className="text-center">
                                            <Button className="btn btn-primary" href={`/employees/${employee.id}`}>Details</Button>{' '}
                                            <Button className="btn btn-success" href={`/employees/update/${employee.id}`}>Update</Button>{' '}
                                            <Button className="btn btn-danger" href={`/employees/delete/${employee.id}`}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button className="btn btn-dark" href={`/employees/add`}>Add Employee</Button>
                    </Row>
                </Container>
            </>
        )
    }
}
