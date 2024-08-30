
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="appContainer">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="homeContainer">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="outletContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
