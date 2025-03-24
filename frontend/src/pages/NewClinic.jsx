import React, { useState } from "react";
import Header from "../components/Header";

const CreateClinicPage = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    clinic_name: "",
    clinic_location: "",
    clinic_rating: "",
    clinic_sold: "",
    clinic_description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理表单提交逻辑
    const clinicData = {
      ...formData,
      owner: currentUser._id, // 从props获取已登录用户ID
    };
    console.log(clinicData);
    // 这里可以添加API调用
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">创建新诊所</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 诊所名称和位置 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  诊所名称
                </label>
                <input
                  type="text"
                  name="clinic_name"
                  value={formData.clinic_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="输入诊所名称"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  诊所位置
                </label>
                <input
                  type="text"
                  name="clinic_location"
                  value={formData.clinic_location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="输入诊所地址"
                  required
                />
              </div>
            </div>

            {/* 评分和销售量 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  评分
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="clinic_rating"
                  value={formData.clinic_rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="输入评分（0-5）"
                  min="0"
                  max="5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  销售量
                </label>
                <input
                  type="number"
                  name="clinic_sold"
                  value={formData.clinic_sold}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="输入销售数量"
                  required
                />
              </div>
            </div>

            {/* 诊所描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                诊所描述
              </label>
              <textarea
                name="clinic_description"
                value={formData.clinic_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="输入诊所描述..."
                maxLength="200"
                required
              />
            </div>

            {/* 所有者信息（只读） */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                所有者
              </label>
              <input
                type="text"
                value={currentUser.name || currentUser.email}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
                disabled
              />
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              创建诊所
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClinicPage;
