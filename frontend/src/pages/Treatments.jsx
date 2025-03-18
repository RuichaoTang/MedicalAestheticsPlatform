import Header from "../components/Header";
import TreatmentCard from "../components/TreatmentCard";
import { useEffect, useState } from "react";

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

  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Choose a Treatment
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Find the best treatment for your needs.
            </p>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 max-w-md shadow-md">
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
              />
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
                      key={`cardId${treatment.treatment_id}`}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
}
