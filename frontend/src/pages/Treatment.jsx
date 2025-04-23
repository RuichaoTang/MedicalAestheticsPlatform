import Header from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatPrice, formatNumber } from "../utils/utils.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import EditTreatment from "../components/EditTreatment.jsx";
import PropTypes from "prop-types";

export default function Treatment() {
  const { treatmentId } = useParams();
  const [treatment, setTreatment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!treatmentId) return;
    const getOneTreatment = async () => {
      try {
        const response = await fetch(`/api/treatments/${treatmentId}`);
        if (!response.ok) throw new Error("Failed to fetch treatment");
        const data = await response.json();
        setTreatment(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getOneTreatment();
  }, [treatmentId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        const response = await fetch(`/api/treatments/delete/${treatmentId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Delete failed");
        navigate(`/clinic/${treatment.clinic}`);
      } catch (err) {
        setError("Delete failed: " + err.message);
      }
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium">Loading Treatment Details...</p>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-semibold mb-2">Loading Error</h2>
          <p className="text-gray-600 max-w-md text-center">{error}</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        <article className="space-y-12 pb-10">
          <div className="grid md:grid-cols-2 gap-6">
            {treatment.images?.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-xl"
              >
                <img
                  src={img}
                  alt="Treatment preview"
                  className="object-cover h-80 w-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
              </div>
            ))}
          </div>

          <header className="space-y-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">
                {treatment.treatment_title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="text-teal-700 font-semibold">
                  Rating: {treatment.treatment_rating}
                </span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-600 font-semibold">
                  {formatNumber(treatment.treatment_sold)} Sold
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <Link
                to={`/clinic/${treatment.clinic}`}
                className="flex items-center bg-teal-50/50 px-4 py-2 rounded-full text-teal-800 font-semibold shadow-sm border border-gray-100 hover:bg-gray-50 transition"
              >
                See Clinic Page
              </Link>
            </div>
          </header>

          <div className="sticky top-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatPrice(treatment.price)}
                  </p>
                </div>
              </div>

              <button
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 md:px-8  py-3 md:py-4 rounded-xl transition-all 
                font-medium text-md md:text-lg shadow-md hover:shadow-teal-100 font-stretch-semi-condensed"
              >
                Purchase (coming soon...)
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section className="prose max-w-none">
                <h2 className="flex items-center gap-3 text-2xl font-serif font-semibold text-gray-900 mb-6">
                  Treatment Overview
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">{treatment.treatment_description}</p>
                  {treatment.treatment_description_details && (
                    <>
                      <h3>Details</h3>
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <p className="text-gray-700">
                          {treatment.treatment_description_details}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>

            <aside className="lg:col-span-1">
              <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                <h2 className="flex items-center gap-3 text-xl font-serif font-semibold text-gray-900 mb-6">
                  Treatment Specialist
                </h2>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={treatment.doctor.doctor_picture_Url}
                    alt={treatment.doctor.doctor_name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-700"
                  />
                  <h3 className="text-lg font-semibold mb-1 ">
                    {treatment.doctor.doctor_name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {treatment.doctor.doctor_role}
                    {/* <Link to={`/clinics/${treatment.doctor.clinicId}`}>
                      <span className="text-gray-700 font-normal hover:text-emerald-900 transition-colors">
                        {" "}
                        - {treatment.doctor.clinic_name}
                      </span>
                    </Link> */}
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </article>

        <div className="my-6 ">
          {treatment && user.user && user.user._id == treatment.owner && (
            <div className="">
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-1.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 font-stretch-semi-condensed font-semibold"
                >
                  {isEditing ? "Discard Changes" : "Edit Treatment"}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-1.5 bg-orange-700 text-white rounded-lg hover:bg-orange-800 font-stretch-semi-condensed font-semibold"
                >
                  Delete Treatment
                </button>
              </div>
            </div>
          )}

          {isEditing && (
            <EditTreatment
              treatment={treatment}
              setIsEditing={setIsEditing}
              setTreatment={setTreatment}
            />
          )}
        </div>
      </div>
    </>
  );
}

EditTreatment.propTypes = {
  treatment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    treatment_title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    treatment_rating: PropTypes.number.isRequired,
    treatment_sold: PropTypes.number.isRequired,
    treatment_description: PropTypes.string.isRequired,
    treatment_description_details: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    clinic: PropTypes.string.isRequired,
    doctor: PropTypes.shape({
      doctor_picture_Url: PropTypes.string.isRequired,
      doctor_name: PropTypes.string.isRequired,
      doctor_role: PropTypes.string.isRequired,
      clinic_name: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setTreatment: PropTypes.func.isRequired,
};
