import React, { useEffect } from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg"
function Header() {
  const location = useLocation();

  useEffect(() => { }, [location]);

  if (location.pathname !== "/" && location.pathname !== '/signIn') {
    return (
      
        <div className="header-container" style={{paddingTop: '20px'}}>
          <h1 className="header-title">Healthcare Hospital Management System</h1>
        <div className="imageContainer" style={{marginTop: "-60px",marginLeft:"350px"}}><img src={logo} alt="Hospital Logo" /></div>
        </div>
     
    );
  } else {
    return (
      <div className="header-container" style={{paddingTop: '15px'}}>
        <h1 className="header-title">Welcome To Healthcare Hospital</h1>
        <p className="header-subtitle">Providing Quality Healthcare</p>
        <div className="imageContainer">
          <img src={logo} alt="Hospital Logo" />
        </div>
      </div>
    );
  }
}

export default Header;
