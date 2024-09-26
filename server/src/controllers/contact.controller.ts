import { Request, Response } from "express";
import nodemailer from 'nodemailer'

export const sendContactMsg = async (req: Request, res: Response) => {
    const { message, name, email, userId } = req.body;
    console.log("🚀 ~ sendContactMsg ~ message:", message)

    try {
        // Send an email (this is a simple example using nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS  // Make sure you use App Passwords if you have 2FA enabled
            }
        });
        const mailOptions = {
            from: email,  // Sender address
            to: "bidhub@yopmail.com",  // Recipient's address
            subject: 'Help',  // Subject
            text: `Hello from ${name}`, // Plain text body
            html: `<h1>Hello</h1><p> ${message} </p>`  // HTML body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return process.exit(1)
            }
        })

    res.status(200).json({ message: "Message sent" });


    } catch (err) {
        console.log(err);
        res.status(500).json('Server error')
    }
}