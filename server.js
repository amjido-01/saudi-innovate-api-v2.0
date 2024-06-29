import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';



const app = express()
const port = process.env.PORT || 5000;

dotenv.config();
app.use(cors())
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.body);
    next()
})


app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body
    console.log(name, email, subject, message)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    transporter.sendMail({
        from: `${name} <${req.body.email}>`,
        to: process.env.EMAIL,
        subject: subject,
        text: message
    }, (err, infor) => {
        if (err) {
            return res.status(500).send(err.toString());
        }
        return res.status(200).json({ success: true });
    })

})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})