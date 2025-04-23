import Header from "../components/Header";
import ClinicCard from "../components/ClinicCard";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Clinics() {
  const [query, setQuery] = useState("");
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClinics() {
      try {
        setLoading(true);
        const response = await fetch("/api/clinics/all");
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setClinics(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clinics:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    fetchClinics();
    console.log(clinics);
    console.log("loading", loading);
    console.log("error", error);
  }, []);

  const handleSearch = async () => {
    console.log("searching");
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/clinics/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setClinics(data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching clinics:", error);
      setError(error.message);
      setLoading(false);
    }
    // console.log(clinics);
  };

  return (
    <>
      <Header />
      <div className="bg-teal-50/10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Choose a Clinic
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Locate a trust worthy medical aesthetic center near you.
            </p>

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full sm:max-w-md shadow-md">
              <svg
                className="w-5 h-5 text-gray-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={handleSearch}
                className="px-4 text-teal-800 rounded-lg font-semibold hover:bg-teal-100 transition duration-300 ease-in-out"
              >
                Search
              </button>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {loading ? (
              <p>loading...</p>
            ) : (
              clinics.map((clinic) => (
                <ClinicCard clinic={clinic} key={`clinicCard${clinic._id}`} />
              ))
            )}
          </div>
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
