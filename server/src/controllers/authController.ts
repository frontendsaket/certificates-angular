import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Otp from "../models/Otp";
import nodemailer from "nodemailer";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { isEmailValid, toTitleCase, generateRandomString } from "../utils/UserHelper";
import CustomRequest from "../types/CustomRequest";

const JWT_SECRET = process.env.JWT_SECRET as string;

const loginUser = async (req: Request, res: Response) => {
  let success = false;

  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "User Not Found!" });
    }

    const otp1 = await Otp.findOne({ email: user.email });

    if (!otp1) {
      return res.json({ error: "OTP Not Found!" });
    }

    if (otp1.otp !== otp) {
      console.log(otp1.otp);
      console.log(otp);
      return res.json({ error: "Invalid OTP!" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "100h",
    });

    success = true;
    return res.json({ success, info: "Login Successful!!", token: token });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const verifyLogin = async (req: CustomRequest, res: Response) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ error: "User Not Found!" });
    }

    return res.json({ success: true, info: "User Verified Successfully!" });

  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
}

const sendOtp = async (req: CustomRequest, res: Response) => {
  const {email} = req.body;
  // check if email is valid and not a spam email
  
  if(!email || !isEmailValid(email.toLowerCase())){
    return res.json({error: "Please enter a valid email"});
  }


    let email1 = email.toLowerCase();
    if(isEmailValid(email1)){

      // check if email is already registered
      const user = await User.findOne({email: email1});
      if(!user){
        return res.json({error: "No User Found!"});
      }

      let otp = Math.floor(100000 + Math.random() * 900000);

      // check if otp is already sent
      const gotOtp = await Otp.findOne({email: email1});
      if(gotOtp){
        otp = gotOtp.otp;
      }

      // use nodemailer to send otp
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        },
        secure: true

      });

      const mailOptions = {
        from: 'Certify <' + process.env.EMAIL + '>',
        to: email,
        subject: 'Your One-Time Password (OTP) Verification Code',
        html: `
          <p>Hello There,</p>
          <p>Thank you for choosing our service. To verify your account, please enter the following One-Time Password (OTP) in the provided field:</p>
          <h2 style="font-weight: bold;">${otp}</h2>
          <p>Please note that this OTP is valid for only a single use and will expire in <strong>5 Minutes</strong>. If you have not initiated this verification process, please disregard this email.</p>
          <p>Thank you for your cooperation.</p>
          <p>Best regards,</p>
          <h4>Certify Co.</h4>
        `
      };
      
      transporter.sendMail(mailOptions, async function(error, info){
        if (error) {
          console.log(error);
          res.json({error: "Something went wrong"});
        } else {
          await Otp.create({email: email1, otp});
          return res.json({success: true, message: "OTP sent successfully"});
        }
      }
      );
    }else{
      return res.json({error: "Please enter a valid email"});
    }
}

export { loginUser, verifyLogin, sendOtp };