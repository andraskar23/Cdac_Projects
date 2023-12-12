import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { URL } from "../../config";
import EditPatient from "./EditPatient";
import "../../pages/receptionist.css";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";

function PatientDetailsReception(props) {
  const location = useLocation();
  const { patientId } = location.state;
  const [show, setShow] = useState(false);
  const [editPatientFlag, setEditPatientFlag] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [wardId,setWardId]=useState(0);
  const [patientDetails, setPatientDetails] = useState("");
  const [dataChangedFlag, setDataChangedFlag] = useState(false);

  
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_reception"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // ====================togling edit moda

  const ToggleEditPatientModal = () => {
    setEditPatientFlag(true);
    handleShow();
  };
  //-------------to change the datachange flag
  const toggleDataFlag = () => {
    setDataChangedFlag(true);
  };
  //checkk if id is recieved
  console.log("id recieved in patientDetailsReception : " + patientId);
  // ==========================get patient from server

  const getPatientsFromServer = () => {
    const url = `${URL}/patient/getPatient/${patientId}`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        setPatientDetails(result.data);
        console.log(res);
       
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };
  useEffect(() => {
    getPatientsFromServer();

    console.log(
      "inside useEffect of ward id------>reception" +
        " dataflag ===>" +
        patientDetails.wardId
    );
  }, [dataChangedFlag]);
  const navigate = useNavigate();
  //decrese bed count===============
  const IncreaseBedCount = () => {
    const body = {
      wardId,
    };
    body.wardId = patientDetails.wardId;
    
    console.log("remove ward " + patientDetails.wardId);
    

      const url = `${URL}/ward/increaseBedCount`;
      axios.post(url, body).then((res) => {
        const result = res.data; //DECREASED
        console.log(result); //INCREASED
        if (result.status == "success" && result.data == "FAILED") {
          toast.warning("bed not freed");
        } else {
          toast.success("bed freed");
        }
      }).catch(err=>{
        navigate("/error");
    });
    
  };

  // ===========================remove patient
  const RemovePatient = () => {
    const url = `${URL}/patient/removePatient/${patientId}`;
    axios.delete(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        navigate("/reception");
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };

  return (
    <div >
      <br/>
      
      <div className="d-flex justify-content-between container-fluid" style={{width:'40%'}}>
        <div className="p-2 bd-highlight">
          <Button onClick={ToggleEditPatientModal} className="btn btn-warning">
            Edit Patient
          </Button>
        </div>
        {/* ==========================remove patient==================================== */}
        <div className="p-2 bd-highlight">
          {patientDetails.paymentStatus == "paid" ? (
            <Button
              onClick={() => {
                IncreaseBedCount();
                RemovePatient();
              }}
              variant="danger"
            >
              <MdOutlineDelete />
              Remove Patient
            </Button>
          ) : (
            <Button variant="danger">Pending</Button>
          )}
        </div>
        <div className="p-2 bd-highlight">
          <Button
            variant="danger"
            onClick={() => {
              navigate("/signIn");
            }}
          >
            Logout
          </Button>
        </div>
        

        {/* ------------------------------------------------------------------------ */}
        {editPatientFlag && (
          <EditPatient
            patientDetails={patientDetails}
            toggleDataFlag={toggleDataFlag}
            dataChangedFlag={dataChangedFlag}
            setEditPatientFlag={setEditPatientFlag}
            handleClose={handleClose}
            show={show}
          />
        )}
      </div>
      <table className="table table-hover receptionPatientTable" 
        style={{}}>
        <tbody>
          <tr>
            <th>Name</th>{" "}
            <td>{patientDetails.firstName + " " + patientDetails.lastName}</td>
          </tr>
          <tr>
            <th>Doctor Alloted </th>{" "}
            <td>
              {patientDetails.doctorFirstName +
                " " +
                patientDetails.doctorLastName}
            </td>
          </tr>
          <tr>
            <th>Doctor Alloted </th> <td>{patientDetails.doctorCellNo}</td>
          </tr>
          <tr>
            <th>Date of Admission </th>{" "}
            <td>{patientDetails.dateOfAdmission}</td>
          </tr>
          <tr>
            <th>Blood Group </th> <td>{patientDetails.bloodGroup}</td>
          </tr>
          <tr>
            <th>Bed Alloted </th>{" "}
            <td>{patientDetails.type + "-" + patientDetails.bedAlloted}</td>
          </tr>
          <tr>
            <th>Patient Problem </th>{" "}
            <td>
              <textarea
                className="form-control"
                value={patientDetails.patientProblem}
                id="exampleFormControlTextarea1"
                rows="2"
                readOnly
              ></textarea>
            </td>
          </tr>

          <tr>
            <th>Payment Status </th>{" "}
            <td>
              {patientDetails.paymentStatus == "paid" ? (
                <Button variant="success">
                  {patientDetails.paymentStatus}
                </Button>
              ) : (
                <Button variant="danger">{patientDetails.paymentStatus}</Button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="p-2 bd-highlight">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/reception");
            }}
          >
            Goback
          </Button>
        </div>
        
    </div>
  );
}

export default PatientDetailsReception;
