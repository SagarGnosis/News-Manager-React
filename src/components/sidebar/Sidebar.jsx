import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">DU Database</span>
        </NavLink>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <NavLink to="/dashboard" className="nav-link" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/new" className="nav-link" style={{ textDecoration: "none" }}>
              <AddBoxIcon className="icon" />
              <span>Add Post</span>
            </NavLink>
          </li>
         
          <p className="title">USER</p>
          <li>
            <NavLink to="/profile" className="nav-link" style={{ textDecoration: "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          
          <li onClick={logout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <span>© 2024 DUadmin</span>
      </div>
      <button className="toggleSidebarBtn" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
};

export default Sidebar;
