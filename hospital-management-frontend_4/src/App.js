
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

import Header from "./components/header/Header";
import Home from "./pages/Home/Home";
import SignIn from "./pages/signIn";
import Admin from "./pages/AdminEmployeeDetails";
import ResetPassword from "./pages/resetPassword";
import PatientDetails from "./pages/pateintDetails";
import ReceptionistHome from "./pages/receptionist";
import DoctorHome from "./pages/doctor/doctor";
import PatientDetailsDoctor from "./pages/doctor/component/PatientDetailsDoctor";
import PatientDetailsReception from "./components/patient/PatientDetailsReception";
import Accountant from "./pages/accountant/Accountant";
import PatientDetailsAccountant from "./pages/accountant/patientDetailsAccountant";

import ErrorHandle from "./pages/errorHandling/ErrorHandle";
import InvalidPage from "./pages/errorHandling/InvalidPage";


import "./App.css";


function App() {
  return (
    <div className="appJS">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/patientDetails" element={<PatientDetails />} />
          <Route path="/reception" element={<ReceptionistHome />} />
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/error" element={<ErrorHandle />} />

          <Route
            path="/doctor/patientDetails"
            element={<PatientDetailsDoctor />}
          />
          <Route
            path="/reception/patientDetails"
            element={<PatientDetailsReception />}
          />
          <Route
            path="/accountant/patientDetails"
            element={<PatientDetailsAccountant />}
          />
          <Route path='*' element={<InvalidPage />} />
        </Routes>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </div>
  );
}

export default App;
