import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "../config/db.js";
import { ObjectId } from "mongodb";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user exists
    const userCollection = client.db("data").collection("users");
    const userExists = await userCollection.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Tokenize the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);
    const insertedUser = result;

    // Generate a JWT token
    const token = jwt.sign({ id: insertedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return the token and user info
    res.status(201).json({
      token,
      user: {
        id: insertedUser._id,
        firstName: insertedUser.firstName,
        lastName: insertedUser.lastName,
        email: insertedUser.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCollection = client.db("data").collection("users");

    await userCollection.createIndex({ email: 1 });

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkLogin = async (req, res) => {
  console.log("Checking login status...");
  // console.log(req.cookies);
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.send({ user: null });
  }

  try {
    const user_decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", user_decoded);

    const user_id = new ObjectId(user_decoded.id);
    const userCollection = client.db("data").collection("users");
    const userData = await userCollection.findOne({
      _id: user_id,
    });

    if (!userData) {
      return res.status(204).send();
    }
    // console.log(userData);
    const { firstName, lastName, email, _id } = userData;
    const user = { firstName, lastName, email, _id };
    // console.log("User:", { firstName, lastName, email });
    res.send({ user });
  } catch (err) {
    res.clearCookie("token");
    return res.status(204).send();
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.send({ success: true, message: "Logout successful" });
};
