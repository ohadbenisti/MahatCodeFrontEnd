import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import AdminGetUsers from "../../features/AdminGetUsers";
import AddQuestion from "../../features/AddQuestion";

const AdminPage = () => {
  useLogin();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <h1 className="m-3 text-4xl font-bold">דף ניהול</h1>
      <div className="tabs flex space-x-4 border-b-2 border-gray-300 mb-4">
        <div
          className={`tab py-2 px-4 border-b-4 ${activeTab === 'users' ? 'border-blue-500' : 'border-transparent'} text-gray-700 cursor-pointer`}
          onClick={() => setActiveTab('users')}
        >
          הצג משתמשים
        </div>
        <div
          className={`tab py-2 px-4 border-b-4 ${activeTab === 'addQuestion' ? 'border-blue-500' : 'border-transparent'} text-gray-700 cursor-pointer`}
          onClick={() => setActiveTab('addQuestion')}
        >
          הוסף שאלה
        </div>
      </div>
      <div className="component-container">
        {activeTab === 'users' && <AdminGetUsers />}
        {activeTab === 'addQuestion' && <AddQuestion />}
      </div>
    </div>
  );
};

export default AdminPage;
