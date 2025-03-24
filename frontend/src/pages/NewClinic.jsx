import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatPrice, formatNumber } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

export default function NewClinic({ clinicId = null }) {
  const [newClinic, setNewClinic] = useState(clinicId === null);
  const user = useAuth();
  const navigate = useNavigate();
  console.log(newClinic);

  const [treatments, setTreatments] = useState([
    {
      treatment_id: 1,
      treatment_title: "Botox Injections",
      treatment_description:
        "Reduce fine lines and wrinkles with FDA-approved Botox injections. Quick and painless with no downtime.",
      treatment_rating: "4.5",
      treatment_sold: 19888,
      price: 1009,
      clinic: null,
      doctor: {
        doctor_id: 1,
        doctor_name: "Dr. Michael Fong",
        clinic_name: "Renew Skin & Laser Center",
        doctor_role: "Botox Specialist",
        doctor_picture_Url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      treatment_id: 2,
      treatment_title: "Dermal Fillers",
      treatment_description:
        "Enhance facial contours and restore volume using premium hyaluronic acid-based fillers like Juvederm and Restylane.",
      treatment_rating: "4.8",
      treatment_sold: 1028,
      price: 100,
      doctor: {
        doctor_id: 1,
        doctor_name: "Dr. James Miller",
        clinic_name: "Glow Aesthetic Clinic",
        doctor_role: "Aesthetic Plastic Surgeon",
        doctor_picture_Url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      treatment_id: 3,
      treatment_title: "Laser Skin Resurfacing",
      treatment_description:
        "Improve skin texture and reduce acne scars using advanced fractional CO2 laser technology.",
      treatment_rating: "3.2",
      treatment_sold: 88,
      price: 100,
      doctor: {
        doctor_id: 1,
        doctor_name: "Dr. Amy Clerkson",
        clinic_name: "Timeless Beauty Institute",
        doctor_role: "Anti-Aging Specialist",
        doctor_picture_Url:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ]);

  const [formData, setFormData] = useState({
    clinic_name: "",
    clinic_location: "",
    clinic_location_street: "",
    clinic_rating: 5,
    clinic_description: "",
    clinic_sold: 500,
    operating_hours: "",
    owner: user._id,
    featured_treatment: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // if editing, then fill the form using db value.
  useEffect(() => {
    if (newClinic) {
      return;
    }
    const fetchClinicData = async () => {
      try {
        const response = await fetch(`/api/clinics/${clinicId}`);
        if (!response.ok) throw new Error("Failed to fetch clinic data");
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClinicData();
  }, [clinicId]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleTreatmentSelect = (treatmentId) => {
    const selected = treatments.find((t) => t.id === treatmentId);
    setFormData((prev) => ({
      ...prev,
      featured_treatment: selected
        ? {
            treatment_id: selected._id,
          }
        : null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name.includes(".")) {
    //   const [parent, child] = name.split(".");
    //   setFormData((prev) => ({
    //     ...prev,
    //     [parent]: {
    //       ...prev[parent],
    //       [child]: value,
    //     },
    //   }));
    // } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/clinics/new-clinic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Update failed");
      const data = await response.json();
      navigate(`/clinic/${data.clinicId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-teal-800">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Clinic Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
              Clinic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Name
                </label>
                <input
                  type="text"
                  name="clinic_name"
                  value={formData.clinic_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (City)
                </label>
                <input
                  type="text"
                  name="clinic_location"
                  value={formData.clinic_location}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Location
                </label>
                <input
                  type="text"
                  name="clinic_location_street"
                  value={formData.clinic_location_street}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="text"
                  name="clinic_email"
                  value={formData.clinic_email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone:
                </label>
                <input
                  type="text"
                  name="clinic_phone"
                  value={formData.clinic_phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
            </div>
          </div>

          {/* 诊所描述 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
              Description
            </h2>
            <textarea
              name="clinic_description"
              value={formData.clinic_description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-48"
              placeholder="Enter clinic description..."
            />
          </div>

          {/* Featured Treatment */}
          {!newClinic && (
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6  font-stretch-ultra-condensed text-teal-900">
                Featured Treatment
              </h2>
              {/* Select Treatment Section */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <select
                    key="select_root"
                    value={formData.featured_treatment?.treatment_id || ""}
                    onChange={(e) => handleTreatmentSelect(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white"
                  >
                    <option key="select_lable" value="">
                      Select a treatment...
                    </option>
                    {treatments.map((treatment) => (
                      <option key={treatment._id} value={treatment._id}>
                        {treatment.treatment_title} (
                        {formatPrice(treatment.price)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
              Operating Hours
            </h2>
            <textarea
              name="operating_hours"
              value={formData.operating_hours}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-48"
              placeholder="Enter operating hours..."
              required
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg text-white hover:bg-orange-800 bg-orange-700 font-stretch-semi-condensed font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-stretch-semi-condensed font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
