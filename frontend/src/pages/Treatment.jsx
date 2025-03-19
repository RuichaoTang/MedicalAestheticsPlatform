import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import { formatPrice, formatNumber } from "../utils/utils.jsx";
import Precaution from "../components/Precaution";
import { useEffect, useState } from "react";

export default function Treatment() {
  const { treatmentId } = useParams();
  const [treatment, setTreatment] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!treatmentId) return;
    const getOneTreatment = async () => {
      try {
        const response = await fetch(`/api/treatments/${treatmentId}`);
        if (!response.ok) throw new Error("Failed to fetch treatment");
        const data = await response.json();
        setTreatment(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getOneTreatment();
  }, [treatmentId]);

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg font-medium">Loading Treatment Details...</p>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-semibold mb-2">Loading Error</h2>
          <p className="text-gray-600 max-w-md text-center">{error}</p>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="space-y-12">
          {/* 图片画廊 */}
          <div className="grid md:grid-cols-2 gap-6">
            {treatment.images?.map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-xl"
              >
                <img
                  src={img}
                  alt="Treatment preview"
                  className="object-cover h-80 w-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
              </div>
            ))}
          </div>

          {/* 标题和信息头 */}
          <header className="space-y-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">
                {treatment.treatment_title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="text-teal-700 font-semibold">
                  Rating: {treatment.treatment_rating}
                </span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-600 font-semibold">
                  {formatNumber(treatment.treatment_sold)} Sold
                </span>
              </div>
            </div>
          </header>

          {/* 价格操作栏 */}
          <div className="sticky top-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatPrice(treatment.price)}
                  </p>
                </div>
              </div>
              <button
                className="bg-teal-700 hover:bg-teal-800 text-white px-4 md:px-8  py-3 md:py-4 rounded-xl transition-all 
                font-medium text-md md:text-lg shadow-md hover:shadow-teal-100"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* 内容区块 */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 主内容 */}
            <div className="lg:col-span-2 space-y-12">
              {/* 疗程描述 */}
              <section className="prose max-w-none">
                <h2 className="flex items-center gap-3 text-2xl font-serif font-semibold text-gray-900 mb-6">
                  Treatment Overview
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">{treatment.treatment_description}</p>
                  {treatment.treatment_description_details && (
                    <>
                      <h3>Details</h3>
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <p className="text-gray-700">
                          {treatment.treatment_description_details}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* 注意事项 */}
              {/* <Precaution /> */}
            </div>

            {/* 侧边栏 - 医生信息 */}
            <aside className="lg:col-span-1">
              <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                <h2 className="flex items-center gap-3 text-xl font-serif font-semibold text-gray-900 mb-6">
                  Treatment Specialist
                </h2>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={treatment.doctor.doctor_picture_Url}
                    alt={treatment.doctor.doctor_name}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-emerald-100"
                  />
                  <h3 className="text-lg font-semibold mb-1 ">
                    {treatment.doctor.doctor_name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {treatment.doctor.doctor_role}
                    <Link to={`/clinics/${treatment.doctor.clinicId}`}>
                      <span className="text-gray-700 font-normal hover:text-emerald-900 transition-colors">
                        {" "}
                        - {treatment.doctor.clinic_name}
                      </span>
                    </Link>
                  </p>
                </div>
              </section>
            </aside>
          </div>
        </article>
        <Precaution />
      </div>
    </>
  );
}
