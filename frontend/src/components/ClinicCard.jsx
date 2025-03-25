import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatNumber, formatPrice } from "../utils/utils";
import PropTypes from "prop-types";

export default function ClinicCard({ clinic }) {
  const [featuredTreatment, setFeaturedTreatment] = useState(null);

  useEffect(() => {
    // console.log("here");
    if (!clinic || !clinic.featured_treatment) {
      return;
    }

    const fetchTreatment = async () => {
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

    fetchTreatment();
  }, [clinic]);

  return (
    <>
      <article
        key={clinic.clinic_id}
        className="flex max-w-xl flex-col items-start justify-between p-6 shadow-sm"
      >
        <div className="group relative w-full">
          <h3 className="mt-3 text-lg/6  text-gray-900 group-hover:text-gray-600 font-serif">
            <Link to={`/clinic/${clinic._id}`}>
              <span className="absolute inset-0" />
              {clinic.clinic_name}
            </Link>
          </h3>
          <div className="flex flex-row items-center text-xs">
            <div className="basis-1/3 relative z-10  py-1.5 font-semibold text-slate-600 text-start">
              {clinic.clinic_location ? clinic.clinic_location : "N/A"}
            </div>
            <div className="text-orange-600 font-semibold basis-1/3">
              Rating: {clinic.clinic_rating}
            </div>
            <div className="text-gray-600 font-semibold basis-1/3 text-end">
              Sold: {formatNumber(clinic.clinic_sold)}
            </div>
          </div>
          <p className="mt-2 line-clamp-3 text-sm/6 text-gray-600">
            {clinic.clinic_description}
          </p>
        </div>
        {featuredTreatment && (
          <div className="relative flex items-center gap-x-4 mt-3">
            <div className="text-sm/6">
              <p className="font-semibold text-gray-900 font-stretch-semi-condensed">
                Featured Treatment:
              </p>
              <p className="font-semibold text-emerald-700">
                <Link to={`/treatment/${featuredTreatment._id}`}>
                  <span className="absolute inset-0" />
                  {featuredTreatment.treatment_title} -{" "}
                  {formatPrice(featuredTreatment.price)}
                </Link>
              </p>
            </div>
          </div>
        )}
      </article>
    </>
  );
}

ClinicCard.propTypes = {
  clinic: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    clinic_name: PropTypes.string.isRequired,
    clinic_location: PropTypes.string,
    clinic_rating: PropTypes.number.isRequired,
    clinic_sold: PropTypes.number.isRequired,
    clinic_description: PropTypes.string.isRequired,
    featured_treatment: PropTypes.string,
  }).isRequired,
};
