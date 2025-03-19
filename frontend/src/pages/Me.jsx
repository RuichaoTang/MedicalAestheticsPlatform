import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth, useAuthDispatch } from "../context/AuthContext";

export default function Me() {
  const { userId } = useParams();
  //   console.log("user-id", userId);

  const [activeTab, setActiveTab] = useState("clinics");
  const [clinics, setClinics] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch(`/api/clinicsByUser/${user.user._id}`);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchClinics();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen ">
        {/* 主容器 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 仪表盘标题和操作区 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-teal-700 mb-4 sm:mb-0">
                Hi! {user.user.firstName}.
              </h1>
              <p>Manage Your Treatments / Clinics here.</p>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
                onClick={() => {
                  /* 添加跳转到创建页面的逻辑 */
                }}
              >
                New Clinic
              </button>
              <button
                className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors"
                onClick={() => {
                  /* 添加跳转到创建页面的逻辑 */
                }}
              >
                New Treatment
              </button>
            </div>
          </div>

          {/* 导航选项卡 */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("clinics")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "clinics"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                我的诊所 ({clinics.length})
              </button>
              <button
                onClick={() => setActiveTab("treatments")}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "treatments"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                我的疗程 ({treatments.length})
              </button>
            </nav>
          </div>

          {/* 内容区域 */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {/* 诊所列表 */}
              {activeTab === "clinics" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clinics.length > 0 ? (
                    clinics.map((clinic) => (
                      <ClinicCard
                        key={clinic._id}
                        clinic={clinic}
                        onEdit={() => {
                          /* 编辑逻辑 */
                        }}
                        onDelete={() => {
                          /* 删除逻辑 */
                        }}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">暂无诊所数据</p>
                    </div>
                  )}
                </div>
              )}

              {/* 疗程列表 */}
              {activeTab === "treatments" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treatments.length > 0 ? (
                    treatments.map((treatment) => (
                      <TreatmentCard
                        key={treatment._id}
                        treatment={treatment}
                        onEdit={() => {
                          /* 编辑逻辑 */
                        }}
                        onDelete={() => {
                          /* 删除逻辑 */
                        }}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">暂无疗程数据</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
