// PersonalArea.js
import React, { useState, useEffect } from 'react';
import UserCourses from '../../features/UserCourses';
import useLogin from '../../hooks/useLogin';
import UserProfileEdit from '../../features/UserProfileEdit';

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
    <div className="container mx-auto p-4 min-h-screen">
      <div className="text-4xl font-bold italic mb-6">
        ברוכים הבאים לאיזור האישי
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <div className="tabs flex space-x-4 border-b-2 border-gray-300 mb-4">
          <div
            className={`tab py-2 px-4 border-b-4 ${activeTab === 'courses' ? 'border-blue-500' : 'border-transparent'} text-gray-700 cursor-pointer`}
            onClick={() => setActiveTab('courses')}
          >
            הקורסים שלי
          </div>
          <div
            className={`tab py-2 px-4 border-b-4 ${activeTab === 'profile' ? 'border-blue-500' : 'border-transparent'} text-gray-700 cursor-pointer`}
            onClick={() => setActiveTab('profile')}
          >
            פרופיל
          </div>
        </div>
        <div className="tab-content flex-grow">
          {activeTab === 'courses' && <UserCourses />}
          {activeTab === 'profile' && (
            <div>
              {!isEditing ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      שם:
                    </label>
                    <p>{userData.name}</p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      אימייל:
                    </label>
                    <p>{userData.email}</p>
                  </div>
                  <button
                    onClick={handleEditToggle}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
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
    </div>
  );
}

export default PersonalArea;
