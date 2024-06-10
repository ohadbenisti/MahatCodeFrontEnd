import React, { useState, useContext, useEffect } from 'react';
import UserCourses from '../../features/UserCourses';
import useLogin from '../../hooks/useLogin';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Update user data here
    console.log('Saving user data:', userData);
    setIsEditing(false);
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
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      שם:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded py-2 px-4 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      אימייל:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded py-2 px-4 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      סיסמה:
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded py-2 px-4 w-full"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    שמור
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;
