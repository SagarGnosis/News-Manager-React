
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${searchQuery}`);
    }
    setSearchQuery("");
    setShowSearch(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  return (
    
    <div className="navbar">
      <div className="wrapper">
       
       
        <div className={`items ${showMenu ? 'show' : ''}`}>
          
          <div className="item">
            <DarkModeOutlinedIcon className="icon" onClick={toggleDarkMode} />
          </div>
          <div className="item">
            <Link to="/"><HomeIcon /></Link>
          </div>
          <div className="item">
            <Link to="/dashboard"><DashboardIcon /></Link>
          </div>
          <div className="item">
            <Link to="/posts/new"><AddBoxIcon /></Link>
          </div>
          <div className="item">
            <Link to="/profile"><AccountCircleIcon /></Link>
          </div>
        </div>
        <div className={`search ${showSearch ? 'show' : ''}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="button" style={{ display: 'none' }}>
            <SearchOutlinedIcon />
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
