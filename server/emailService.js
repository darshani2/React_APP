const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'prabath096@gmail.com', 
      pass: 'xxxxxxxxxxxxxxxxxxxxxxxxxx', //Replace with your app password and above email.
    },
  });

  const sendVerificationEmail = (toEmail, verificationToken, subject, role) => {
    const mailOptions = {
      from: 'your-email@example.com',
      to: toEmail,
      subject: subject,
      text: `Click on the following link to verify your email: http://localhost:3000/user/${role}/verify?token=${verificationToken}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  

module.exports = { sendVerificationEmail };
