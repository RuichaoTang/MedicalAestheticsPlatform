import Header from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatPrice, formatNumber } from "../utils/utils.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import EditClinic from "../components/EditClinic";
import TreatmentCard from "../components/TreatmentCard.jsx";

export default function Treatment() {
  const { clinicId } = useParams();
  //   console.log(clinicId);
  const user = useAuth();
  const [clinic, setClinic] = useState({});
  const [featuredTreatment, setFeaturedTreatment] = useState(null);
  const [allTreatments, setAllTreatments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // get the clinic info
  useEffect(() => {
    if (!clinicId) return;
    const getOneClinic = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/clinics/${clinicId}`);
        // console.log(response);
        if (!response.ok) throw new Error("Failed to fetch a clinic");
        const data = await response.json();
        setClinic(data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getOneClinic();
  }, [clinicId]);

  // // show auth state
  // useEffect(() => {
  //   console.log("auth", authenticated);
  // }, [authenticated]);

  // get the featured treatment info
  useEffect(() => {
    // console.log("here");
    if (!clinic || !clinic.featured_treatment) {
      return;
    }

    const fetchFeaturedTreatment = async () => {
      try {
        // console.log(clinic.featured_treatment);
        const response = await fetch(
          `/api/treatments/${clinic.featured_treatment}`
        );
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch treatment");
        }
        const data = await response.json();
        // console.log(data);
        setFeaturedTreatment(data);
      } catch (error) {
        console.error("Error fetching treatment:", error);
      }
    };

    fetchFeaturedTreatment();
  }, [clinic]);

  // get all treatment info
  useEffect(() => {
    // console.log("here");
    if (!clinic) {
      return;
    }

    const fetchAllTreatments = async () => {
      try {
        // console.log(clinic.featured_treatment);
        const response = await fetch(
          `/api/treatments/treatmentByClinic/${clinicId}`
        );
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch all treatments 1");
        }
        const data = await response.json();
        console.log("all", data);
        setAllTreatments(data);
      } catch (error) {
        console.error("Error fetching all treatments:", error);
      }
    };

    fetchAllTreatments();
  }, [clinic]);

  const handleNewTreatment = async () => {
    navigate(`/new-treatment/${clinicId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        const response = await fetch(`/api/clinics/delete/${clinicId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Delete failed");
        navigate("/me");
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
        <article className="space-y-12 ">
          <header className="space-y-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">
                {clinic.clinic_name}
              </h1>
              <span className="bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-medium">
                {clinic.clinic_location}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="text-teal-700 font-semibold">
                  Rating: {clinic.clinic_rating}
                </span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-600 font-semibold">
                  {formatNumber(clinic.clinic_sold)} Services Booked
                </span>
              </div>
            </div>
          </header>

          {/* Featured Treatment*/}
          {featuredTreatment && clinic.featured_treatment && (
            <div className="sticky top-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Featured Treatment
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-gray-600">
                      {featuredTreatment.treatment_title}
                    </p>
                    <p className="text-teal-700 font-bold">
                      {formatPrice(featuredTreatment.price)}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/treatment/${featuredTreatment._id}`}
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl transition-all 
                font-medium text-md shadow-md hover:shadow-teal-100"
                >
                  View Treatment
                </Link>
              </div>
            </div>
          )}

          <div className="border-b border-gray-100 pb-8">
            {/* Left Part (Main) */}
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <section className="prose max-w-none">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                    About Our Clinic
                  </h2>
                  <div className="space-y-6 text-gray-600 leading-relaxed">
                    <p className="text-lg">{clinic.clinic_description}</p>
                  </div>
                </section>
              </div>

              {/* right part - contact info*/}
              <aside className="lg:col-span-1">
                <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                  <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Location</h3>
                      <p className="text-gray-600">{clinic.clinic_location}</p>
                      <p className="text-gray-600">
                        {clinic.clinic_location_street}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Operating Hours
                      </h3>
                      <p className="text-gray-600">
                        {clinic.operating_hours || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Contact</h3>
                      <div className="text-gray-600">
                        {
                          <p>
                            {clinic.clinic_phone || "Phone Number not provided"}
                          </p>
                        }
                        {<p>{clinic.clinic_email || "Email not provided"}</p>}
                      </div>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
            <section>
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-1 mt-8">
                All Treatments
              </h2>
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-gray-200 mb-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {loading ? (
                  "Loading..."
                ) : error ? (
                  error
                ) : !allTreatments ? (
                  <></>
                ) : (
                  allTreatments.map((treatment) => (
                    <TreatmentCard
                      treatment={treatment}
                      key={`cardId${treatment._id}`}
                    />
                  ))
                )}
              </div>
            </section>
          </div>
        </article>
        <div className="mt-6">
          {clinic && user.user && user.user._id == clinic.owner && (
            <div className="">
              <div className="flex justify-center md:justify-start gap-4 mb-8">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-stretch-semi-condensed font-semibold"
                >
                  {isEditing ? "Discard Changes" : "Edit Clinic"}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-stretch-semi-condensed font-semibold"
                >
                  Delete Clinic
                </button>
                <button
                  onClick={handleNewTreatment}
                  className="ml-auto px-6 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-stretch-semi-condensed font-semibold"
                >
                  New Treatment
                </button>
              </div>
            </div>
          )}

          {isEditing && (
            <EditClinic
              clinic={clinic}
              setClinic={setClinic}
              setIsEditing={setIsEditing}
              treatments={allTreatments}
            />
          )}
        </div>
      </div>
    </>
  );
}
