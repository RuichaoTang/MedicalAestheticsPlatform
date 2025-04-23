// import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatPrice } from "../utils/utils";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

export default function NewClinic({
  clinic = null,
  setClinic = null,
  setIsEditing = null,
  treatments = null,
}) {
  const [newClinic] = useState(clinic === null);
  const user = useAuth();
  const navigate = useNavigate();
  //   console.log(newClinic);

  const [formData, setFormData] = useState({
    clinic_name: clinic ? `${clinic.clinic_name}` : "",
    clinic_location: clinic ? `${clinic.clinic_location}` : "",
    clinic_location_street: clinic ? `${clinic.clinic_location_street}` : "",
    clinic_rating: clinic ? clinic.clinic_rating : 5,
    clinic_description: clinic ? `${clinic.clinic_description}` : "",
    clinic_sold: clinic ? clinic.sold : 500,
    operating_hours: clinic ? clinic.operating_hours : "",
    clinic_email: clinic ? clinic.clinic_email : "",
    clinic_phone: clinic ? clinic.clinic_phone : "",
    owner: user.user._id,
    featured_treatment: clinic ? clinic.featured_treatment : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("treatments", treatments);

  // if editing, then fill the form using db value.
  useEffect(() => {
    if (newClinic) {
      return;
    }
    const fetchClinicData = async () => {
      try {
        const response = await fetch(`/api/clinics/${clinic._id}`);
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
  }, [clinic]);

  const handleTreatmentSelect = (treatmentId) => {
    console.log("treatmentId", treatmentId);
    setFormData((prev) => ({
      ...prev,
      featured_treatment: treatmentId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (newClinic) {
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
        setLoading(false);
        // console.log(data);
        navigate(`/clinic/${data.clinicId}`);
        // setFeaturedTreatment(data.featured_treatment);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    } else {
      try {
        const response = await fetch(`/api/clinics/edit-clinic/${clinic._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Update failed");
        const data = await response.json();
        setLoading(false);
        // console.log("data", data);
        setClinic(data);
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
      <div className="w-full bg-teal-50/50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    <input
                      type="text"
                      name="clinic_name"
                      value={formData.clinic_name}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (City)
                    <input
                      type="text"
                      name="clinic_location"
                      value={formData.clinic_location}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Location
                    <input
                      type="text"
                      name="clinic_location_street"
                      value={formData.clinic_location_street}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email:
                    <input
                      type="text"
                      name="clinic_email"
                      value={formData.clinic_email}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone:
                    <input
                      type="text"
                      name="clinic_phone"
                      value={formData.clinic_phone}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 font-stretch-ultra-condensed text-teal-900">
                Clinic Description
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
            {!newClinic && treatments && treatments.length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6  font-stretch-ultra-condensed text-teal-900">
                  Featured Treatment
                </h2>
                {/* Select Treatment Section */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <select
                      key="select_root"
                      value={formData.featured_treatment || ""}
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
                Clinic Open Hours
              </h2>
              <textarea
                name="operating_hours"
                value={formData.operating_hours}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-48"
                placeholder="Enter clinic open hours..."
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={
                  newClinic
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
                className="px-6 py-1.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-stretch-semi-condensed font-semibold"
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
  clinic: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    clinic_name: PropTypes.string.isRequired,
    clinic_location: PropTypes.string.isRequired,
    clinic_location_street: PropTypes.string,
    clinic_rating: PropTypes.number,
    clinic_description: PropTypes.string.isRequired,
    clinic_sold: PropTypes.number,
    operating_hours: PropTypes.string,
    clinic_email: PropTypes.string,
    clinic_phone: PropTypes.string,
    featured_treatment: PropTypes.string,
  }),
  setClinic: PropTypes.func,
  setIsEditing: PropTypes.func,
  treatments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      treatment_title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

// 设置默认值（根据你的组件参数默认值）
NewClinic.defaultProps = {
  clinic: null,
  setClinic: null,
  setIsEditing: null,
  treatments: null,
};
