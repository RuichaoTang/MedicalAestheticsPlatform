import { client } from "../config/db.js";
import { ObjectId } from "mongodb";

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
  console.log(userId);
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
