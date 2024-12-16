import React from "react";


const Header = () => {
  return (
    <div className="header">
      {/* Search Bar - Left Side */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Icons - Right Side */}
      <div className="header-icons">
        <i className="bell-icon">🔔</i>
        <i className="user-icon">👤</i>
      </div>
    </div>
  );
};

export default Header;
