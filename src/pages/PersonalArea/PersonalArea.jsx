// PersonalArea.jsx
import React, { useState, useEffect } from 'react';
import UserCourses from '../../features/UserCourses';
import useLogin from '../../hooks/useLogin';
import UserProfileEdit from '../../features/UserProfileEdit';
import './PersonalArea.css';

function PersonalArea() {
  const { data } = useLogin();
  const [activeTab, setActiveTab] = useState('courses');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (data && data.user) {
      setUserData({
        name: data.user.name,
        email: data.user.email,
        password: ''
      });
    }
  }, [data]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="personal-area-container">
      <div className="content-wrapper">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            הקורסים שלי
          </div>
          <div
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            פרופיל
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'courses' && <UserCourses />}
          {activeTab === 'profile' && (
            <div className="profile-content">
              {!isEditing ? (
                <div className="user-profile">
                  <div className="profile-header">
                    <div className="avatar"></div>
                    <div className="profile-info">
                      <h2>{userData.name}</h2>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <button onClick={handleEditToggle} className="edit-button">
                    עריכה
                  </button>
                </div>
              ) : (
                <UserProfileEdit
                  userData={userData}
                  setUserData={setUserData}
                  setIsEditing={setIsEditing}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PersonalArea;