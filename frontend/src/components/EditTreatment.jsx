// import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { formatPrice } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

export default function NewClinic({
  treatment = null,
  setIsEditing = null,
  setTreatment = null,
}) {
  const [newTreatment] = useState(treatment === null);
  const user = useAuth();
  const { clinicId } = useParams();
  const navigate = useNavigate();
  console.log("clinicId", clinicId);
  //   console.log("user", user);

  const [formData, setFormData] = useState({
    treatment_title: treatment ? `${treatment.treatment_title}` : "",

    treatment_description: treatment
      ? `${treatment.treatment_description}`
      : "",
    treatment_sold: treatment ? treatment.sold : 500,
    treatment_rating: treatment ? treatment.treatment_rating : "",

    price: treatment ? treatment.price : "",
    owner: user.user._id,
    doctor: {
      doctor_id: 1,
      doctor_name: "Coming Soon...",
      clinic_name: "Doctor-related functionalities",
      doctor_role: "Coming Soon...",
      doctor_picture_Url:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    clinic: clinicId,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   if editing, then fill the form using db value.
  useEffect(() => {
    if (newTreatment) {
      return;
    }
    const fetchClinicData = async () => {
      try {
        const response = await fetch(`/api/treatments/${treatment._id}`);
        if (!response.ok) throw new Error("Failed to fetch treatment data");
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClinicData();
  }, [treatment]);

  useEffect(() => {
    console.log("formdata", formData);
    // console.log("user", user);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (newTreatment) {
      try {
        const response = await fetch(
          `/api/treatments/new-treatment/${clinicId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) throw new Error("Update failed");
        const data = await response.json();
        setLoading(false);
        console.log("data", data);
        navigate(`/treatment/${data.treatmentId}`);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    } else {
      try {
        const response = await fetch(
          `/api/treatments/edit-treatment/${treatment._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) throw new Error("Treatment Update failed");
        const data = await response.json();
        setLoading(false);
        // console.log("data", data);
        setTreatment(data);
        setIsEditing(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="w-full bg-teal-800 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Clinic Info */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
                Treatment Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Treatment Name
                  </label>
                  <input
                    type="text"
                    name="treatment_title"
                    value={formData.treatment_title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
                Description
              </h2>
              <textarea
                name="treatment_description"
                value={formData.treatment_description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-48"
                placeholder="Enter clinic description..."
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={
                  newTreatment
                    ? () => navigate(-1)
                    : () => {
                        setIsEditing(false);
                      }
                }
                className="px-6 py-1.5 rounded-lg text-white hover:bg-orange-800 bg-orange-700 font-stretch-semi-condensed font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-stretch-semi-condensed font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
