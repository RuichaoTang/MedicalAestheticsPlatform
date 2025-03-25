import { client } from "../config/db.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export const showAllTreatments = async (req, res) => {
  try {
    const treatmentCollection = client.db("data").collection("treatment");
    const treatments = await treatmentCollection.find().toArray();
    // console.log(treatments);
    res.status(200).json(treatments);
  } catch (error) {
    console.error("Error during fetching treatments:", error);
    res.status(500).json({ message: error.message });
  }
};

export const findOneTreatment = async (req, res) => {
  // console.log("finding one...");
  // console.log(req.params.id);
  try {
    const treatmentCollection = client.db("data").collection("treatment");
    const theTreatment = await treatmentCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    // console.log(theTreatment);
    res.status(200).json(theTreatment);
  } catch (error) {
    console.error("Error during fetching a treatment:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchByClinic = async (req, res) => {
  const clinicId = req.params.id;
  console.log(clinicId);
  try {
    const treatmentCollection = client.db("data").collection("treatment");
    const treatments = await treatmentCollection
      .find({ clinic: new ObjectId(clinicId) })
      .toArray();
    console.log(treatments);
    res.status(200).json(treatments);
  } catch (error) {
    console.error("Error during fetching treatments:", error);
    res.status(500).json({ message: error.message });
  }
};

export const newTreatment = async (req, res) => {
  try {
    const treatmentCollection = client.db("data").collection("treatment");

    const {
      treatment_title,
      treatment_description,
      treatment_sold,
      treatment_rating,
      price,
      clinic,
      doctor,
      owner,
    } = req.body;

    const newTreatment = {
      treatment_title,
      treatment_description,
      treatment_sold,
      treatment_rating,
      price,
      clinic: new ObjectId(clinic),
      doctor,
      owner: new ObjectId(owner),
      createdAt: new Date(),
    };

    const response = await treatmentCollection.insertOne(newTreatment);
    const treatmentId = response.insertedId;
    // console.log("response", response);
    res.status(200).json({ treatmentId: treatmentId });
  } catch (error) {
    console.error("Error during create a new treatment:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTreatment = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid token" });
  }
  const treatmentId = req.params.id;
  console.log(treatmentId);

  try {
    const treatmentCollection = client.db("data").collection("treatment");
    const treatment = await treatmentCollection.findOne({
      _id: new ObjectId(treatmentId),
    });
    if (!treatment) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    if (treatment.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized: You are not the owner of this clinic",
      });
    }

    await treatmentCollection.deleteOne({
      _id: new ObjectId(treatmentId),
    });
    console.log("succ");

    res.status(200).json({ message: "Treatment deleted successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Treatment Delete failed", error: err.message });
  }
};

export const editTreatment = async (req, res) => {
  // console.log(req.params.id);
  try {
    const treatmentCollection = client.db("data").collection("treatment");

    const {
      treatment_title,
      treatment_description,
      treatment_sold,
      treatment_rating,
      price,
      clinic,
      doctor,
      owner,
    } = req.body;

    const updatedTreatment = {
      treatment_title,
      treatment_description,
      treatment_sold,
      treatment_rating,
      price,
      clinic: new ObjectId(clinic),
      doctor,
      owner: new ObjectId(owner),
      createdAt: new Date(),
    };

    // update the clinic
    const result = await treatmentCollection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) }, // find by id
      { $set: { ...updatedTreatment, updatedAt: new Date() } }, // update the clinic
      { returnDocument: "after" } // return the updated clinic
    );

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating treatment:", error);
    res.status(500).json({ error: "Failed to update treatment" });
  }
};
