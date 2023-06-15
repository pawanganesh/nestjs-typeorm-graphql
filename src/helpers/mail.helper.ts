import { createTransport, SendMailOptions } from 'nodemailer';
import { SMTP } from '../config/constant';

const transporter = createTransport({
  host: SMTP.SMTP_HOST,
  port: SMTP.SMTP_PORT,
  secure: SMTP.SMTP_SECURE,
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export const sendMail = async (options: SendMailOptions) => {
  try {
    options.from = `${SMTP.SMTP_USER} <${SMTP.SMTP_FROM_NAME}>`;
    const result = await transporter.sendMail(options);
    console.log('SEND MAIL RESULT START', result);
  } catch (err) {
    console.log('SEND MAIL ERROR START', err);
  }
};
