import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import AdminGetUsers from "../../features/AdminGetUsers";
import AddQuestion from "../../features/AddQuestion";
import "./AdminPage.css";

const AdminPage = () => {
  useLogin();
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-container">
      <h1 className="header2">דף ניהול</h1>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          הצג משתמשים
        </div>
        <div
          className={`tab ${activeTab === 'addQuestion' ? 'active' : ''}`}
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
