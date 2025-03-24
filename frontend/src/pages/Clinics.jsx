import Header from "../components/Header";
import ClinicCard from "../components/ClinicCard";
import { useState, useEffect } from "react";

// const clinics = [
//   {
//     clinic_id: 1,
//     clinic_name: "Glow Aesthetic Clinic",
//     clinic_location: "Los Angeles, CA",
//     clinic_rating: "4.7",
//     clinic_sold: 25678,
//     clinic_description:
//       "A premier medical spa specializing in non-invasive treatments for youthful skin and body contouring.",
//     featured_treatment: {
//       treatment_id: 101,
//       treatment_name: "Botox Injections",
//       treatment_price: "350",
//     },
//   },
//   {
//     clinic_id: 2,
//     clinic_name: "Renew Skin & Laser Center",
//     clinic_location: "New York, NY",
//     clinic_rating: "4.8",
//     clinic_sold: 31240,
//     clinic_description:
//       "Offering cutting-edge laser treatments and aesthetic procedures for flawless skin and anti-aging solutions.",
//     featured_treatment: {
//       treatment_id: 102,
//       treatment_name: "Laser Skin Resurfacing",
//       treatment_price: "1200",
//     },
//   },
//   {
//     clinic_id: 3,
//     clinic_name: "Elite MedSpa",
//     clinic_location: "Miami, FL",
//     clinic_rating: "4.6",
//     clinic_sold: 17890,
//     clinic_description:
//       "Luxury aesthetics clinic specializing in advanced cosmetic treatments to enhance beauty naturally.",
//     featured_treatment: {
//       treatment_id: 103,
//       treatment_name: "Dermal Fillers",
//       treatment_price: "650",
//     },
//   },
//   {
//     clinic_id: 4,
//     clinic_name: "Timeless Beauty Institute",
//     clinic_location: "Chicago, IL",
//     clinic_rating: "4.9",
//     clinic_sold: 22450,
//     clinic_description:
//       "Providing expert anti-aging treatments and facial enhancements with the latest medical advancements.",
//     featured_treatment: {
//       treatment_id: 104,
//       treatment_name: "Non-Surgical Rhinoplasty",
//       treatment_price: "1800",
//     },
//   },
//   {
//     clinic_id: 5,
//     clinic_name: "Luxury Aesthetics",
//     clinic_location: "Houston, TX",
//     clinic_rating: "4.5",
//     clinic_sold: 15030,
//     clinic_description:
//       "A high-end clinic focused on personalized skincare and body sculpting solutions.",
//     featured_treatment: {
//       treatment_id: 105,
//       treatment_name: "Microneedling with PRP",
//       treatment_price: "900",
//     },
//   },
// ];

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

  return (
    <>
      <Header />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Choose a Clinic
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Locate a trust worthy medical aesthetic center near you.
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
