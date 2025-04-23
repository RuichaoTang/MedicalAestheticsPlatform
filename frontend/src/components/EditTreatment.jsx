// import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

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
      doctor_name: "",
      clinic_name: "",
      doctor_role: "",
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
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update doctor object
    if (name.startsWith("doctor_")) {
      setFormData((prev) => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          [name]: value,
        },
      }));
    }
    // update other info
    else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
  const handleImageUpload = () => {
    return; // implemtent later
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
                    min="0"
                    step="0.01"
                    placeholder="Enter price..."
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

            {/* image upload here */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
                Doctor Information
              </h2>

              {/* Doctor image */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doctor Photo (implement later)
                </label>
                <div className="flex items-center">
                  <div className="mr-4">
                    {formData.doctor_photo ? (
                      <img
                        src={formData.doctor_photo}
                        alt="Doctor"
                        className="w-20 h-20 rounded-full object-cover border-2 border-teal-100"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors border border-teal-200">
                      Upload Photo
                    </span>
                    <input
                      type="file"
                      name="doctor_photo"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Docter Name */}
              <div className="mb-6">
                <label
                  htmlFor="doctor_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctor_name"
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                  placeholder="Enter doctor's full name..."
                />
              </div>

              {/* Doctor Position */}
              <div className="mb-2">
                <label
                  htmlFor="doctor_position"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="doctor_role"
                  name="doctor_role"
                  value={formData.doctor_role}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-500"
                  placeholder="E.g. Cardiologist, Senior Surgeon..."
                />
              </div>
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

NewClinic.propTypes = {
  treatment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    treatment_title: PropTypes.string.isRequired,
    treatment_description: PropTypes.string.isRequired,
    treatment_sold: PropTypes.number,
    treatment_rating: PropTypes.number,
    price: PropTypes.number.isRequired,
    doctor: PropTypes.shape({
      doctor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      doctor_name: PropTypes.string,
      clinic_name: PropTypes.string,
      doctor_role: PropTypes.string,
      doctor_picture_Url: PropTypes.string,
    }),
    clinic: PropTypes.string.isRequired,
  }),
  setIsEditing: PropTypes.func,
  setTreatment: PropTypes.func,
};

NewClinic.defaultProps = {
  treatment: null,
  setIsEditing: null,
  setTreatment: null,
};
