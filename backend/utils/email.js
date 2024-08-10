const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
 
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false, // true for port 465, false for port 587
    tls: {
      rejectUnauthorized: false, // can be set to true if you want to verify certificates
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Damian Zięba <damian526z8@gmail.com>', // Update the 'from' address
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // You can also include HTML if needed
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
