import { Badge, Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Medicine from "../components/medicine/Medicine";

import axios from "axios";
import { URL } from "../config";
import "./pateintDetails.css";

const PatientDetails = () => {
  const location = useLocation();
  const { patId } = location.state;
       
       //set token from session storage
       const [token, setToken] = useState(sessionStorage.getItem("token_patient"));
       //to set defaults of axios header
       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({});
  // medicines corrusponding to patient
  const [medicines, setMedicines] = useState([]);
  //to refresh the page
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  //=============================get data from server=============
  const GetPatientDataFromServer = () => {
    const url = `${URL}/patient/getPatient/${patId}`;
    //{{url}}/patient/getPatient/20
    axios.get(url).then((res) => {
      const result = res.data;
      console.log("inside GetPatientDataFromServer ");
      console.log(res);
      if (result.status == "success") setPatientData(result.data);
      else toast.warning("inavalid user logged in ");
    }).catch(err=>{
      navigate("/error");
  });
  };
  //to get corrusponding medicines from server
  const GetAllMedicineOfPatientFromServer = () => {
    setDataChangedFlag(false); //to refresh the page to update to current values
    const url = `${URL}/patient/getMedicines/${patId}`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setMedicines(result.data);
        console.log("medicine recieved from server for patient" + res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  //useEffect to update page on data change
  useEffect(() => {
    console.log("inside use effect patient details");
    GetAllMedicineOfPatientFromServer();
    GetPatientDataFromServer();
  }, [dataChangedFlag]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className="tooltip-inner"  {...props}>
      <div style={{ color: "yellow" }}>contact no: {patientData.cellNo},</div>
      {/* <div style={{ color: "yellow" }}>address:{patientData.address}</div> */}
    </Tooltip>
  );
  const PaymentStatus = () => {
    if (patientData.paymentStaus == "paid") {
      return (
        <div className="paymentStatusBadge" style={{ color: "green" }}>
          paid
        </div>
      );
    } else {
      return (
        <div
          className="paymentStatusBadge"
          style={{ color: "red", padding: "5px" }}
        >
          pending
        </div>
      );
    }
  };
  return (
    <div className="container-fluid mainContainer ">
      <div style={{ marginTop: "30px", float: "right",marginRight:"70px" }}>
        <Button
          onClick={() => {
            navigate("/signIn");
          }}
          variant="danger"
        >
          LogOut
        </Button>
      </div>
      
      <div>
        <OverlayTrigger
        className='tooltip-inner'
          placement="right"
          delay={{ show: 300, hide: 20 }}
          overlay={renderTooltip}
        >
          <Button style={{ marginTop: "30px"}} variant="warning">
            {" "}
            <h4 className="title">
              Welcome {patientData.firstName + " " + patientData.lastName}
            </h4>
          </Button>
        </OverlayTrigger>
       
      </div>
      <center>
      <table className="table table-hover patientTableContainer">
        <tbody>
          <tr>
            <th>Name</th>{" "}
            <td>{patientData.firstName + " " + patientData.lastName}</td>
          </tr>
          
          <tr>
            <th>Payment Status </th> <td>{patientData.paymentStatus}</td>
          </tr>
          <tr>
            <th>Doctor Alloted </th>{" "}
            <td>
              {patientData.doctorFirstName + " " + patientData.doctorLastName}
            </td>
          </tr>
          <tr>
            <th>Doctor Phone No </th> <td>{patientData.doctorCellNo}</td>
          </tr>
          <tr>
            <th>Date of Admission </th> <td>{patientData.dateOfAdmission}</td>
          </tr>
          <tr>
            <th>Blood Group </th> <td>{patientData.bloodGroup}</td>
          </tr>
          <tr>
            <th>Bed Alloted </th>{" "}
            <td>{patientData.type + "-" + patientData.bedAlloted}</td>
          </tr>
          <tr>
            <th>Patient Problem </th> <td>{patientData.patientProblem}</td>
          </tr>
          <tr>
            <th>Prescription </th>{" "}
            <td>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={patientData.prescription}
                  id="exampleFormControlTextarea1"
                  rows="2"
                  readOnly
                ></textarea>
              </div>
            </td>
          </tr>

          <tr>
            <th>Medicine Alloted </th>
            <td>
              <table className="patientPageMedicineList table">
                <tr >
                  <th>Medicine</th>
                  <th>No of tablets</th>
                  <th>Prescription</th>
                </tr>

                {medicines.map((medicine) => {
                  return <Medicine medicine={medicine} />;
                })}
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      </center>
    </div>
  );
};

export default PatientDetails;
