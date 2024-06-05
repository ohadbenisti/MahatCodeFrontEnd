import React, { useState } from 'react';
import UserCourses from '../../features/UserCourses';

function PersonalArea() {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="text-4xl font-bold italic" style={{marginBottom: '6rem'}}>
        ברוכים הבאים לאיזור האישי
      </div>
      <div className="w-full max-w-2xl mx-auto">
        <div className="tabs flex space-x-4 border-b-2 border-gray-300 mb-4">
          <button
            className={`tab py-2 px-4 border-b-4 ${activeTab === 'courses' ? 'border-blue-500' : 'border-transparent'} text-gray-700`}
            onClick={() => setActiveTab('courses')}
          >
            הקורסים שלי
          </button>
          <button
            className={`tab py-2 px-4 border-b-4 ${activeTab === 'profile' ? 'border-blue-500' : 'border-transparent'} text-gray-700`}
            onClick={() => setActiveTab('profile')}
          >
            פרופיל
          </button>
        </div>
        <div className="tab-content flex-grow">
          {activeTab === 'courses' && <UserCourses />}
          {activeTab === 'profile' && <div>פרופיל משתמש</div>}
        </div>
      </div>
    </div>
  );
}

export default PersonalArea;
