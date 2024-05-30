import React from 'react';
import '../Styles/ComponentStyles/Sidebar.css'
import { Link } from 'react-router-dom';
const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="logo">
        <h1 style={{ textAlign: 'center' }}>DIE Engine</h1>
      </div>
      <ul className="menu">
        <li><Link to="/">Create API</Link></li>
        <li><Link to="/view-api">View API</Link></li>
        <li><Link to="/create-endpoints">Create Endpoints</Link></li>
        <li><Link to="/view-endpoints">View Endpoints</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
