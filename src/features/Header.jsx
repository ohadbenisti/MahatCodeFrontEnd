import { Link, useLocation } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import logo from "../assets/logo.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Avatar } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import "../pages/Content/Content.css";

const Header = ({ onLogout, isContentPage }) => {
  const userInfo = useLogin();
  const location = useLocation();

  return (
    <div className={`header-container ${isContentPage ? "header-transparent" : ""}`}>
      <div className="header text-2xl w-full py-3">
        <div className="mx-auto flex justify-between items-center px-6">
          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <img src={logo} className="w-2/3 sm:w-1/2 max-w-[400px]" alt="logo" style={{ borderRadius: '5px' }} />
            </Link>
          </div>
          <div className="flex items-center sm:items-stretch gap-4 sm:gap-4">
            {userInfo?.data?.user && (
              <>
                {userInfo?.data?.user?.role === "admin" ? (
                  <>
                    <p className="text-blue-950 font-medium" style={{ marginLeft: '0px'}}>שלום, <span className="font-semibold text-white">{userInfo.data.user.name} </span> </p>
                    <Link to="/admin">
                      <Tooltip title="ניהול">
                        <ManageAccountsIcon style={{ color: '#FFD700' }} fontSize="large" />
                      </Tooltip>
                    </Link>
                    <Tooltip title="יציאה">
                      <LogoutIcon
                        onClick={onLogout}
                        fontSize="large"
                        style={{ marginTop: '3px', color: "white", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <p className="text-white" style={{ marginLeft: '0px'}}>שלום {userInfo.data.user.name} </p>
                    <Link to="/PersonalArea">
                      <Tooltip title="איזור אישי">
                        <Avatar>{userInfo.data.user.name[0]}</Avatar>
                      </Tooltip>
                    </Link>
                    <Tooltip title="יציאה">
                      <LogoutIcon
                        onClick={onLogout}
                        fontSize="large"
                        style={{ marginTop: '3px', color: "white", cursor: "pointer" }}
                      />
                    </Tooltip>
                  </>
                )}
              </>
            )}
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
    </div>
  );
};

export default Header;
