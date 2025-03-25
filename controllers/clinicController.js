import { client } from "../config/db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const showAllClinics = async (req, res) => {
  try {
    const clinicCollection = client.db("data").collection("clinic");
    const clinics = await clinicCollection.find().toArray();
    // console.log(clinics);
    res.status(200).json(clinics);
  } catch (error) {
    console.error("Error during fetching clinics:", error);
    res.status(500).json({ message: error.message });
  }
};

export const findOneClinic = async (req, res) => {
  // console.log("finding one...");
  // console.log(req.params.id);
  try {
    const treatmentCollection = client.db("data").collection("clinic");
    const theClinic = await treatmentCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    // console.log(theClinic);
    res.status(200).json(theClinic);
  } catch (error) {
    console.error("Error during fetching the clinic:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchByOwner = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  try {
    const clinicCollection = client.db("data").collection("clinic");
    const clinics = await clinicCollection
      .find({ owner: new ObjectId(userId) })
      .toArray();
    // console.log(clinics);
    res.status(200).json(clinics);
  } catch (error) {
    console.error("Error during fetching clinics:", error);
    res.status(500).json({ message: error.message });
  }
};

export const newClinic = async (req, res) => {
  try {
    const clinicCollection = client.db("data").collection("clinic");

    const {
      clinic_name,
      clinic_location,
      clinic_location_street,
      clinic_rating,
      clinic_description,
      clinic_sold,
      clinic_phone,
      clinic_email,
      operating_hours,
      owner,
      featured_treatment,
    } = req.body;

    const newClinic = {
      clinic_name,
      clinic_location,
      clinic_location_street,
      clinic_rating,
      clinic_description,
      clinic_sold,
      clinic_phone,
      clinic_email,
      operating_hours,
      featured_treatment,
      owner: new ObjectId(owner),
      createdAt: new Date(),
    };

    const response = await clinicCollection.insertOne(newClinic);
    const clinicId = response.insertedId;
    // console.log("response", response);
    res.status(200).json({ clinicId });
  } catch (error) {
    console.error("Error during create a new clinic:", error);
    res.status(500).json({ message: error.message });
  }
};

export const editClinic = async (req, res) => {
  // console.log(req.params.id);
  try {
    const clinicCollection = client.db("data").collection("clinic");
    const {
      clinic_name,
      clinic_location,
      clinic_location_street,
      clinic_rating,
      clinic_description,
      clinic_sold,
      clinic_email,
      clinic_phone,
      operating_hours,
      owner,
      featured_treatment,
    } = req.body;

    const updatedClinic = {
      clinic_name,
      clinic_location,
      clinic_location_street,
      clinic_rating,
      clinic_description,
      clinic_sold,
      clinic_email,
      clinic_phone,
      operating_hours,
      featured_treatment,
      owner: new ObjectId(owner),
    };

    // update the clinic
    const result = await clinicCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) }, // find by id
      { $set: { ...updatedClinic, updatedAt: new Date() } }, // update the clinic
      { returnDocument: "after" } // return the updated clinic
    );

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating clinic:", error);
    res.status(500).json({ error: "Failed to update clinic" });
  }
};

export const deleteClinic = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // 将用户信息附加到请求中
    console.log(user);
  });

  const clinicId = req.params.id;
  console.log(clinicId);

  try {
    // 查找 clinic
    const clinicCollection = client.db("data").collection("clinic");
    const clinic = await clinicCollection.findOne({
      _id: new ObjectId(clinicId),
    });
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // 验证 clinic 的 ownerId 是否与用户的 id 匹配
    if (clinic.owner.toString() !== req.user.id) {
      // 假设 user.id 是 token 中的用户 ID
      return res.status(403).json({
        message: "Unauthorized: You are not the owner of this clinic",
      });
    }

    // 删除 clinic
    await clinic.remove();
    console.log("succ");
    res.status(200).json({ message: "Clinic deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
