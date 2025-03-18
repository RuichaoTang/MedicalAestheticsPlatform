import { client } from "../config/db.js";

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
