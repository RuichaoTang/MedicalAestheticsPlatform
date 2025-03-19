import { Link } from "react-router-dom";
export default function ClinicCard({ clinic }) {
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
        key={clinic.clinic_id}
        className="flex max-w-xl flex-col items-start justify-between p-6"
      >
        <div className="group relative">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 font-serif">
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
          <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
            {clinic.clinic_description}
          </p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="text-sm/6">
            <p className="font-semibold text-gray-900">Featured Treatment:</p>
            <p className="font-semibold text-emerald-700">
              <Link to={`/treatment/${clinic.featured_treatment.treatment_id}`}>
                <span className="absolute inset-0" />
                {clinic.featured_treatment.treatment_name} -{" "}
                {formatPrice(clinic.featured_treatment.treatment_price)}
              </Link>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
