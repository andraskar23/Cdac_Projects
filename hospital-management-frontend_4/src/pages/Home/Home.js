import React from "react";
// import Carousel from "./Carousel/Carousel";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";
import "./Home.css"; // Import your custom CSS file
import sample1 from "../../assets/sunbeam1.jpg";
import sample2 from "../../assets/BG2.jpg";
import sample3 from "../../assets/BG3.jpg";
export default function Home() {
  const navigate = useNavigate();

  const signIn = () => {
    navigate("/signIn");
  };

  return (
    <div>
      <div className="button-container">
        <button className="btn btn-primary" onClick={signIn}>
          Login
        </button>
      </div>
      <div className="carousel-container">
      <Carousel>
          {/* You can place your carousel images here */}
          <div className="carousel-item">
            <img src={sample1} alt="Carousel 1" />
          </div>
          <div className="carousel-item">
            <img src={sample2} alt="Carousel 2" />
          </div>
          <div className="carousel-item">
            <img src={sample3} alt="Carousel 3" />
          </div>
          {/* Add more carousel items as needed */}
        </Carousel>
      </div>
        <br/>
      <Container>
        <div className="container-text">
        <p className="px-5">

A Hospital Management System (HMS), also known as Hospital Information System (HIS) or Healthcare Information Management System (HIMS), is a comprehensive software solution designed to manage various aspects of a healthcare facility's operations, from patient registration and billing to medical records and inventory management.
</p>
        </div>
      </Container>
      <div className="container marketing service-container">
        <div className="row">
          <div className="col-lg-4">
            <div className="service-item">
              <h2>About Us</h2>
              <p><p>The SUNBEAM hospital is a specialized healthcare institution or facility where medical professionals provide comprehensive medical treatment, care, and services to individuals suffering from illnesses, injuries, or various health conditions. Hospitals play a crucial role in the healthcare system by offering a wide range of medical services, from emergency care and surgery to diagnostics, long-term care, and rehabilitation.</p></p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="service-item">
              <h2>Contact Us</h2>
              Address: Sunbeam Multispeciality Hospital
              <br />Hinjewadi Phase 2, Pune
              <br />Pin - 131101
              <br />Toll Free No - 1800 402 5555
              <br />Tel No - +91 14099999
              <br />Email - sunbeaminfo@gmail.com
            </div>
          </div>
          <div className="col-lg-4">
            <div className="service-item">
              <h2>Service</h2>
              Pediatrics
              <br />Obstetrics and Gynecology
              <br />Cardiology
              <br />Orthopedics
              <br />Oncology
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
