import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { isEmailValid, toTitleCase, generateRandomString } from "../utils/UserHelper";
import Certificate from "../models/Certificate";
import CustomRequest from "../types/CustomRequest";

const JWT_SECRET = process.env.JWT_SECRET as string;
const DEV_PASS = process.env.DEV_PASS as string;

const getAllCertificates = async (req: CustomRequest, res: Response) => {
  let success = false;

  try {
    const user = await User.findById(req.user.id);
    if(!user){
      return res.json({error: "User Not Found!"});
    }

    const certificates = await Certificate.find({recipient: user._id});

    success = true;
    return res.json({ success, certificates });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const getCertificateById = async (req: Request, res: Response) => {
  let success = false;

  const { id } = req.params;

  try {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.json({ error: "Certificate Not Found!" });
    }

    success = true;
    return res.json({ success, certificate });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

const createCertificate = async (req: Request, res: Response) => {
  let success = false;

  const { title, description, image, devpass, email, name } = req.body;

  try {

    if(devpass !== DEV_PASS){
      return res.json({ error: "Invalid Password!" });
    }

    if (!title || !description || !image || !email) {
      return res.json({ error: "Missing Fields!" });
    }

    if (!isEmailValid(email)) {
      return res.json({ error: "Invalid Email!" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      if(!name || !email){
        return res.json({ error: "Missing Name Field!" });
      }
      user = new User({ name: toTitleCase(name), email });
      await user.save();
    }

    const certificate = new Certificate({
      title,
      description,
      image,
      recipient: user._id
    });

    await certificate.save();

    success = true;
    return res.json({ success, info: "Certificate Created Successfully!" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something Went Wrong!" });
  }
};

export { getAllCertificates, getCertificateById, createCertificate };