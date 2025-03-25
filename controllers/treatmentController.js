import { client } from "../config/db.js";
import { ObjectId } from "mongodb";

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
