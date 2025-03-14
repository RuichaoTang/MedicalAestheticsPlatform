import { Link } from "react-router-dom";
export default function ClinicCard({ treatment }) {
  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  }

  function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }

  return (
    <>
      <article
        key={treatment.treatment_id}
        className="flex max-w-xl flex-col items-start justify-between"
      >
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-medium text-gray-900 group-hover:text-gray-600 font-serif">
            <Link to={`/treatment/:id=${treatment.treatment_id}`}>
              <span className="font-serif" />
              {treatment.treatment_title}
            </Link>
          </h3>
          <div className="flex flex-row items-center text-xs">
            <div className="text-slate-600 font-medium basis-1/3">
              Price: {formatPrice(treatment.price)}
            </div>
            <div className="basis-1/3 relative z-10 rounded-full px-3 py-1.5 font-semibold text-orange-600 ">
              Rating: {treatment.treatment_rating}
            </div>
            <div className="text-gray-600 font-medium basis-1/3 text-end">
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
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900">
              <Link to={`/doctors/${treatment.doctor.doctor_id}`}>
                <span className="absolute inset-0" />
                {treatment.doctor.doctor_name}
              </Link>
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
