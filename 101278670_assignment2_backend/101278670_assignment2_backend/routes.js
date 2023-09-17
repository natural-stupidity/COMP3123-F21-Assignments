const express = require('express');
const app = express();
const employeeModel = require('./employeeModel.js');

const validate = (employee, excludeID) => {
    if (!employee.id || !employee.firstName || !employee.lastName || !employee.emailId) {
        let output = "";
        let fields = [];
        if (!employee.id) fields.push("Employee ID");
        if (!employee.firstName) fields.push("First Name");
        if (!employee.lastName) fields.push("Last Name");
        if (!employee.emailId) fields.push("Email ID");
        if (fields.length > 1) {
            for (let i = 0; i < fields.length; i++) {
                if (i == fields.length - 1) output += "and " + fields[i];
                else output += fields[i] + ", ";
            }
        }
        else output += fields[0]
        output += " cannot be empty!";
        throw new Error(output);
    }
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(employee.emailId).toLowerCase())) {
        throw new Error('Email not valid!');
    }
}

//All Employee Resources are Fetched
app.get('/api/v1/employees', (req, res) => {
    employeeModel.find().then(employees => { res.send(employees); }).catch(err => {
        res.status(500).send({ message: err.message || "Error: Could not retrieve Employees." });
    });
});

//A New Employee Resource is Created
app.post('/api/v1/employees', (req, res) => {
    try { validate(req.body); } catch (err) { return res.status(400).send({ message: err.message }); };

    const employee = new employeeModel(req.body);
    employee.save().then(data => { res.send(data); }).catch(err => {
        res.status(500).send({ message: err.message || "Error: Could not create Employee." });
    });
});

//One Employee Resource is Fetched
app.get('/api/v1/employees/:id', (req, res) => {
    employeeModel.findOne({ id: req.params.id }).then(employee => {
        if (!employee) return res.status(404).send({ message: "Employee not found with ID: " + req.params.id });
        res.send(employee);
    }).catch(err => {
        return res.status(500).send({ message: "Error retrieving employee with ID: " + req.params.id });
    });
});

//Employee Resource is Updated
app.put('/api/v1/employees/:id', (req, res) => {
    try { validate(req.body); } catch (err) { return res.status(400).send({ message: err.message }); };

    employeeModel.findOneAndUpdate({ id: req.params.id }, req.body).then(employee => {
        if (!employee) return res.status(404).send({ message: "Employee not found with ID: " + req.params.id });
        res.send(employee);
    }).catch(err => {
        return res.status(500).send({ message: "Error updating Employee with ID: " + req.params.id });
    });
});

//Employee Resource is Deleted
app.delete('/api/v1/employees/:id', (req, res) => {
    employeeModel.deleteOne({ id: req.params.id }).then(employee => {
        if (!employee) return res.status(404).send({ message: "Employee not found with ID: " + req.params.id });
        res.send({ message: "Employee deleted successfully!" });
    }).catch(err => {
        return res.status(500).send({ message: "Could not delete Employee with ID: " + req.params.id });
    })
});

module.exports = app;