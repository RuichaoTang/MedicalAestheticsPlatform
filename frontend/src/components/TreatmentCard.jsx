import { Link } from "react-router-dom";
import { formatNumber, formatPrice } from "../utils/utils";
import PropTypes from "prop-types";
export default function ClinicCard({ treatment }) {
  return (
    <>
      <article
        key={treatment._id}
        className="flex max-w-xl flex-col items-start justify-between bg-white shadow-xs rounded-lg px-5 pb-3"
      >
        <div className="group relative bg-white">
          <h3 className="mt-3 text-lg/6 font-medium text-gray-900 group-hover:text-gray-600 font-serif">
            <Link to={`/treatment/${treatment._id}`}>
              <span className="font-serif" />
              {treatment.treatment_title}
            </Link>
          </h3>
          <div className="flex flex-row items-center text-xs">
            <div className="text-slate-600 font-medium basis-1/3" tabIndex="0">
              Price: {formatPrice(treatment.price)}
            </div>
            <div
              className="basis-1/3 relative z-10 rounded-full px-3 py-1.5 font-semibold text-amber-700 "
              tabIndex="0"
            >
              Rating: {treatment.treatment_rating}
            </div>
            <div
              className="text-gray-600 font-medium basis-1/3 text-end"
              tabIndex="0"
            >
              Sold: {formatNumber(treatment.treatment_sold)}
            </div>
          </div>
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
            {treatment.treatment_description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            alt="Doctor's Picture"
            src={treatment.doctor.doctor_picture_Url}
            className="size-10 rounded-full bg-gray-50"
          />
          <div
            className="text-sm/6"
            tabIndex="0"
            aria-label="Doctor's infomation"
          >
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {treatment.doctor.doctor_name}
            </p>
            <p className="text-gray-600">
              {treatment.doctor.doctor_role} - {treatment.doctor.clinic_name}
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

ClinicCard.propTypes = {
  treatment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    treatment_title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    treatment_rating: PropTypes.number.isRequired,
    treatment_sold: PropTypes.number.isRequired,
    treatment_description: PropTypes.string.isRequired,
    doctor: PropTypes.shape({
      doctor_picture_Url: PropTypes.string.isRequired,
      doctor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      doctor_name: PropTypes.string.isRequired,
      doctor_role: PropTypes.string.isRequired,
      clinic_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
