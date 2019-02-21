import mailer from 'nodemailer';

const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const pass = process.env.MAILER_PASSWORD || 'auth_email_pass';

const transporter = mailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'gmail',
  auth: {
    user: email,
    pass,
  },
});
