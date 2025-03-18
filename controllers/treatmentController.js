import { client } from "../config/db.js";

export const showAllTreatments = async (req, res) => {
  try {
    const treatmentCollection = client.db("data").collection("treatment");
    const treatments = await treatmentCollection.find().toArray();
    console.log(treatments);
    res.status(200).json(treatments);
  } catch (error) {
    console.error("Error during fetching treatments:", error);
    res.status(500).json({ message: error.message });
  }
};
