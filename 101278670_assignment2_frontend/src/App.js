import { Container, Navbar, Nav, } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import AUEmployee from './pages/AUEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import './App.css';

function App() {
    return (
        <>
            <Navbar style={{ backgroundColor: "#FE5F55",}}>
                <Container>
                    <Navbar.Brand href="/">COMP 3123 - Assignment 2</Navbar.Brand>
                    <Navbar.Collapse id="navbarNav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/">View Employees</Nav.Link>
                            <Nav.Link href="/employees/add">Add Employee</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/employees/:id" element={<EmployeeDetails/>} />
                        <Route path="/employees/add" element={<AUEmployee/> } />
                        <Route path="/employees/update/:id" element={<AUEmployee/> } />
                        <Route path="/employees/delete/:id" element={<DeleteEmployee/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
         </>
    );
}

export default App;
