const cron = require('node-cron');
const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');

let app = express();

// create mail transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yaghobieh@gmail.com',
      pass: 'john132456'
    }
});

// sending emails at periodic intervals
cron.schedule('* * * * *', () => {

    console.log('---------------------');
    console.log('Running Cron Job');
    let mailOptions = {
      from: 'COMPANYEMAIL@gmail.com',
      to: 'yaghobieh@gmail.com',
      subject: `Not a GDPR update ;)`,
      text: `Hi there, this email was automatically sent by us`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error;
      } else {
        console.log('Email successfully sent!');
      }
    });
});


// Schedule cron @ 19 day in month 
cron.schedule('* * 19 * *', () => {
    console.log('---------------------');
    console.log('Running Cron Job');
    fs.unlink('./error.log', err => {
      if (err) throw err;
      console.log('Error file succesfully deleted');
    });
});

app.listen(3000, () => console.log('Server is running...'));