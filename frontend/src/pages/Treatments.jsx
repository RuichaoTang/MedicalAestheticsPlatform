import Header from "../components/Header";
import TreatmentCard from "../components/TreatmentCard";
import { useState } from "react";

const treatments = [
  {
    treatment_id: 1,
    treatment_title: "Botox Injections",
    treatment_description:
      "Reduce fine lines and wrinkles with FDA-approved Botox injections. Quick and painless with no downtime.",

    treatment_rating: "4.5",
    treatment_sold: 19888,
    price: 1009,
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

  // More posts...
];

export default function Treatments() {
  const [query, setQuery] = useState("");
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
            {treatments.map((treatment) => (
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
