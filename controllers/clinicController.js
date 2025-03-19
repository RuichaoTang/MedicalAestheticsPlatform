import { client } from "../config/db.js";
import { ObjectId } from "mongodb";

export const showAllClinics = async (req, res) => {
  try {
    const clinicCollection = client.db("data").collection("clinic");
    const clinics = await clinicCollection.find().toArray();
    console.log(clinics);
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
    console.log(theClinic);
    res.status(200).json(theClinic);
  } catch (error) {
    console.error("Error during fetching the clinic:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchByOwner = async (req, res) => {
  try {
    const clinicCollection = client.db("data").collection("clinic");
    const clinics = await clinicCollection.find().toArray();
    console.log(clinics);
    res.status(200).json(clinics);
  } catch (error) {
    console.error("Error during fetching clinics:", error);
    res.status(500).json({ message: error.message });
  }
};
