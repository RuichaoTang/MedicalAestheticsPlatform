import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import ClinicCard from "../components/ClinicCard";
import PropTypes from "prop-types";

export default function Me() {
  const [activeTab, setActiveTab] = useState("clinics");
  const [clinics, setClinics] = useState([]);
  // const [orders, setOrders] = useState([]); // coming soon...
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = useAuth();
  // console.log(user);

  useEffect(() => {
    const fetchYourClinics = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/clinics/clinicsByUser/${user.user._id}`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          setClinics(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("error", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchYourClinics();
  }, [user.user._id]);

  return (
    <>
      <Header />

      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="mb-6 sm:mb-0">
              <h1 className="text-3xl font-bold text-teal-700">
                Hi! {user.user.firstName}.
              </h1>
              <p className="font-serif text-xl sm:text-2xl">
                Manage Your Clinics here.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-teal-700 font-semibold text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
                onClick={() => {
                  navigate("/new-clinic");
                }}
              >
                New Clinic
              </button>
            </div>
          </div>

          {/* direct */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("clinics")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "clinics"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Clinics ({clinics.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "treatments"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {/* My History Orders ({orders.length}) */}
              </button>
            </nav>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {activeTab === "clinics" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clinics.length > 0 ? (
                    clinics.map((clinic, index) => (
                      <ClinicCard clinic={clinic} key={index} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">
                        Currently, you don't have any clinic. Create one if you
                        want.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Order History
              {activeTab === "orders" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orders.length > 0 ? (
                    orders.map(() => (
                      // add a order history in the future.
                      <></>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">
                        You don't have any order history.
                      </p>
                    </div>
                  )}
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}

ClinicCard.propTypes = {
  clinic: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    clinic_name: PropTypes.string.isRequired,
    clinic_location: PropTypes.string.isRequired,
    clinic_rating: PropTypes.number.isRequired,
    clinic_sold: PropTypes.number.isRequired,
    clinic_description: PropTypes.string.isRequired,
    clinic_phone: PropTypes.string,
    clinic_email: PropTypes.string,
    featured_treatment: PropTypes.string,
    clinic_location_street: PropTypes.string,
    operating_hours: PropTypes.string,
  }).isRequired,
};
