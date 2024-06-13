import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="pearl-bg py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">אודות אתר האימון ופתרונות מבחני מה"ט</h1>
            <p className="text-lg text-gray-600">
              ברוכים הבאים לאתר שלנו, המיועד לסייע לסטודנטים ולמועמדים להתכונן בצורה מקיפה ויעילה למבחני מה"ט. אנו מציעים מגוון רחב של משאבים וכלים להכנה מושלמת לקראת המבחנים החשובים האלה.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">המטרה שלנו</h2>
            <p className="text-gray-600">
              מטרתנו העיקרית היא לספק לכם את הידע והכלים הדרושים להצלחה במבחני מה"ט. אנו מאמינים כי הכנה נכונה ומעמיקה היא המפתח להישגים גבוהים במבחנים אלה, ולכן אנו משקיעים מאמצים רבים בפיתוח חומרי הלמידה והתרגול שלנו.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">מה תמצאו באתר?</h2>
            <ul className="text-gray-600 list-disc pl-4">
              <li className="mb-2">בנק שאלות ענק הכולל אלפי שאלות ממבחנים קודמים, ממוינות לפי נושאים, רמות קושי, ושפות תכנות.</li>
              <li className="mb-2">חומרי לימוד מקיפים ומעודכנים, הכוללים תיאוריה, הסברים, דוגמאות וסימולציות.</li>
              <li className="mb-2">סביבת תרגול אינטראקטיבית לכתיבת קוד, הרצה, ובדיקת פתרונות.</li>
              <li>פורום פעיל לשאלות, דיונים, והתייעצויות עם הקהילה.</li>
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">צוות מנוסה ומקצועי</h2>
            <p className="text-gray-600">
              האתר שלנו מנוהל על ידי צוות מקצועי ומנוסה, הכולל מרצים, מתרגלים, וסטודנטים מצטיינים. כל חומרי הלמידה והתרגול עוברים בקרה קפדנית כדי להבטיח את איכותם ורלוונטיותם. אנו עובדים ללא לאות כדי לשפר ולהעשיר את האתר בתכנים חדשים ומעודכנים.
            </p>
          </div>
        </div>
      </div>
      <div className="buttermilk-bg py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">המלצות מתלמידים</h2>
            <div className="bg-gray-100 p-6 rounded-md">
              <p className="text-gray-600 italic mb-4">"האתר הזה היה כלי עזר מצוין בהכנה שלי למבחני מה"ט. התכנים המקיפים והסביבה האינטראקטיבית עזרו לי להתכונן בצורה יסודית ולהשיג ציונים גבוהים."</p>
              <p className="text-sm text-gray-500">- דני, סטודנט להנדסת חשמל</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-md">
              <p className="text-gray-600 italic mb-4">"לא הייתי מצליח בלי האתר הזה. הפורום היה מקום נהדר לשאול שאלות, לקבל עזרה, ולחלוק ידע עם הקהילה. ממליץ בחום!"</p>
              <p className="text-sm text-gray-500">- יהלי, סטודנטית להנדסת תוכנה</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;