const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// create a transport object to send emails -- SHOULD USE OAUTH FOR SECURITY REASONS (UNLESS USIGN A PROXY SERVER)
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'aiqdevteam@gmail.com',
//         pass: ''
//     }
// })

app.post('/register', (req, res, next) => {
    // console.log(req.body);
    // destructure the request object to relevant variables
    const { name, email, mobile, wantCallback } = req.body;

    // console.log(name);
    // console.log(email);
    // console.log(mobile);
    // console.log(wantCallback);


})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));