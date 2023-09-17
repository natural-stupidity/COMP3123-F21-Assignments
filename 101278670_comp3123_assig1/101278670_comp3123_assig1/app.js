//Use expressJS framework to create REST API to perform given task.
const express = require('express');
const app = express();
const fs = require('fs');
const router = express.Router();

//Read the given users.json file and return the requested details by client.
const users = JSON.parse(fs.readFileSync('users.json'));


///Endpoint /user?uid=?
router.get('/user', (req, res) => {
    let id = parseInt(req.query.uid);
    let foundUser = users.find(user => user.id === id);
    if (typeof (foundUser) !== "undefined" && foundUser !== null) {
        const displayUser = (({ id, name, email, address, phone }) => ({ id, name, email, address, phone }))(foundUser);
        displayUser.address = displayUser.address.street + ", " + displayUser.address.city + ", " + displayUser.address.zipcode;
        res.send(displayUser);
    }
    res.send({message: "No user found"});
});

// Endpoint /users/all
router.get('/users/all', (req, res) => {
    users.sort((a, b) => a.username.localeCompare(b.username));
    res.send(users);
});

app.use('/', router);
//app.listen(process.env.port || 8081);
//console.log('Web Server is listening at port ' + (process.env.port || 8081));
app.listen(8081);
console.log('Web Server is listening at port ' + (8081));