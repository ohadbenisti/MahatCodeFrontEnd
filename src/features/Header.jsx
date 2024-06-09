import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import logo from "../assets/logo.jpg";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Avatar } from "@mui/material";
import "../pages/Content/Content.css";

export const Header = ({ onLogout, isContentPage }) => {
  const userInfo = useLogin();

  return (
    <div className={`header-container ${isContentPage ? "header-transparent" : ""}`}>
      <div className="header text-2xl w-full py-4">
        <div className="mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <img src={logo} className="w-2/3 sm:w-1/2 max-w-[400px]" alt="logo" />
            </Link>
            {userInfo?.data?.user && (
              <div className="flex items-center text-white ml-4">
                <p className="text-white mr-2 md:mr-4">שלום {userInfo.data.user.name} 😊</p>
                <Link to="/" className="text-white mr-2 md:mr-4">
                  דף הבית
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:items-stretch gap-4 sm:gap-4">
            {userInfo?.data?.user && (
              <>
                {userInfo?.data?.user?.role === "admin" && (
                  <Link to="/admin">
                    <ManageAccountsIcon style={{ color: '#FFD700' }} fontSize="large" />
                  </Link>
                )}
                <Link to="/PersonalArea">
                  <Avatar>{userInfo.data.user.name[0]}</Avatar>
                </Link>
                <LogoutIcon onClick={onLogout} fontSize="large" style={{ marginTop: '3px', color: "white" }} />
              </>
            )}
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
    </div>
  );
};

export default Header;