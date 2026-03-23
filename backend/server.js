const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();


app.use(cors({
  origin: "https://bulk-mail-app-.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb+srv://saravana:123@mail.dtwutpd.mongodb.net/passkey?appName=mail")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const MailSchema = new mongoose.Schema({
  subject: String,
  msg: String,
  emails: [String],
  status: String
});

const Mail = mongoose.model("Mail", MailSchema);

// Nodemailer
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:  "saravanais2020@gmail.com",  
    pass:  "pdmq duag elpj gher",   
  },
});

// API
app.post("/sendemail", async (req, res) => {

  const { subject, msg, emails } = req.body;

  try {

    for (let email of emails) {
      await transporter.sendMail({
        from:  "saravanais2020@gmail.com",
        to: email,
        subject: subject,
        text: msg,
      });
    }

    await Mail.create({
      subject,
      msg,
      emails,
      status: "sent"
    });

    res.send("Emails sent successfully ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error ❌");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
