import Header from "../components/Header";
import TreatmentCard from "../components/TreatmentCard";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Treatments() {
  const [query, setQuery] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTreatments() {
      try {
        setLoading(true);
        const response = await fetch("/api/treatments/all");
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setTreatments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching treatments:", error);
        setError(error.message);
        setLoading(false);
      }
    }
    fetchTreatments();
    console.log(treatments);
    console.log("loading", loading);
    console.log("error", error);
  }, []);

  const handleSearch = async () => {
    console.log("searching");
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `/api/treatments/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setTreatments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching treatments:", error);
      setError(error.message);
      setLoading(false);
    }
    console.log(treatments);
  };

  return (
    <>
      <Header />
      <div className="bg-teal-50/10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl text-center sm:text-start">
              Choose a Treatment
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600 text-center sm:text-start">
              Find the best treatment for your needs.
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
                placeholder="Search for a treatment..."
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
            {loading
              ? "Loading..."
              : error
              ? error
              : treatments.map((treatment) => (
                  <TreatmentCard
                    treatment={treatment}
                    key={`cardId${treatment._id}`}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

TreatmentCard.propTypes = {
  treatment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    treatment_title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    treatment_rating: PropTypes.number.isRequired,
    treatment_sold: PropTypes.number.isRequired,
    treatment_description: PropTypes.string.isRequired,
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
};
