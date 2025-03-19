import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import { formatPrice, formatNumber } from "../utils/utils.jsx";
import { useState, useEffect } from "react";

export default function Treatment() {
  const { clinicId } = useParams();
  //   console.log(clinicId);
  const [clinic, setClinic] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clinicId) return;
    const getOneClinic = async () => {
      try {
        const response = await fetch(`/api/clinics/${clinicId}`);
        // console.log(response);
        if (!response.ok) throw new Error("Failed to fetch a clinic");
        const data = await response.json();
        setClinic(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getOneClinic();
  }, [clinicId]);

  useEffect(() => {
    console.log("Updated clinic state:", clinic);
  }, [clinic]);

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
          {/* 诊所信息头 */}
          <header className="space-y-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900 font-serif tracking-tight">
                {clinic.clinic_name}
              </h1>
              <span className="bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-medium">
                {clinic.clinic_location}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="text-teal-700 font-semibold">
                  Rating: {clinic.clinic_rating}
                </span>
                <span className="text-gray-400 mx-2">|</span>
                <span className="text-gray-600 font-semibold">
                  {formatNumber(clinic.clinic_sold)} Services Booked
                </span>
              </div>
            </div>
          </header>

          {/* 特色疗程 */}
          <div className="sticky top-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Featured Treatment
                </h3>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">
                    {clinic.featured_treatment?.treatment_name}
                  </p>
                  <p className="text-teal-700 font-bold">
                    {formatPrice(clinic.featured_treatment?.treatment_price)}
                  </p>
                </div>
              </div>
              <Link
                to={`/treatments/${clinic.featured_treatment?.treatment_id}`}
                className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl transition-all 
                    font-medium text-md shadow-md hover:shadow-teal-100"
              >
                View Treatment
              </Link>
            </div>
          </div>

          {/* 内容区块 */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 主内容 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 诊所描述 */}
              <section className="prose max-w-none">
                <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
                  About Our Clinic
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">{clinic.clinic_description}</p>

                  {/* 服务亮点 */}
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold mb-2">Our Expertise</h3>
                      <p className="text-gray-600 text-sm">
                        Specializing in advanced aesthetic treatments with
                        FDA-approved technologies and certified professionals.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-semibold mb-2">Safety Standards</h3>
                      <p className="text-gray-600 text-sm">
                        Fully accredited facility following strict medical
                        protocols and hygiene standards.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* 侧边栏 - 联系信息 */}
            <aside className="lg:col-span-1">
              <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-24">
                <h2 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">{clinic.clinic_location}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Operating Hours
                    </h3>
                    <p className="text-gray-600">
                      Mon-Fri: 9am - 7pm
                      <br />
                      Saturday: 10am - 5pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Contact</h3>
                    <p className="text-gray-600">
                      (555) 123-4567
                      <br />
                      info@glowclinic.com
                    </p>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}
