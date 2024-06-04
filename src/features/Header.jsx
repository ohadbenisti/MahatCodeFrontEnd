import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

export const Header = ({ onLogout }) => {
  const userInfo = useLogin();
  const location = useLocation();

  return (
    <div className="bg-[#577B8D] text-2xl border-b border-black w-full py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center">
          <Link to="/" className="shrink-0">
            <img src={logo} className="w-2/3 sm:w-1/2 max-w-[300px]" alt="logo" />
          </Link>
          <div className="ml-auto flex items-center text-white">
            {userInfo && (
              <>
                <p className="text-white mr-2 md:mr-4">שלום {userInfo.data.user.name} 😊</p>
                <Link to="/" className="mr-2 md:mr-4">
                  דף הבית
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center sm:items-stretch gap-2 sm:gap-4">
          {userInfo && userInfo.data.user.role === "admin" && (
            <Link to="/admin">
              <button className="bg-blue-500 text-white border-none rounded-md cursor-pointer py-1 px-2 md:px-3 hover:bg-blue-600 transition-all duration-300">
                דף ניהול
              </button>
            </Link>
          )}
          <Link to="/PersonalArea">
            <button className="bg-blue-500 text-white border-none rounded-md cursor-pointer py-1 px-2 md:px-3 hover:bg-blue-600 transition-all duration-300">
              אזור אישי
            </button>
          </Link>
          <button
            className="bg-red-600 text-white border-none rounded-md cursor-pointer py-1 px-2 md:px-3 hover:bg-red-700 transition-all duration-300"
            onClick={onLogout}
          >
            התנתקות
          </button>
        </div>
        {!userInfo && (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {location.pathname === "/login" && (
              <Link to="/signup" className="text-white">
                הרשמה
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/login" className="text-white">
                כניסה
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
