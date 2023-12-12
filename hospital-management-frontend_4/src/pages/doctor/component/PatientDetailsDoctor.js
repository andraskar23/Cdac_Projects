import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Route, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { URL } from "../../../config";
import AddPrescription from "./addPrescription";
import "../doctor.css";
import AddMedicines from "./addMedicine";
import MedicineForDoctorPage from "./doctorPatientMedicine";
function PatientDetailsDoctor(props) {
  const location = useLocation();
  const { patientId } = location.state;
  const [show, setShow] = useState(false);
  const [editPatientFlag, setEditPatientFlag] = useState(false);
  const [addMedicineFlag, setAddMedicineFlag] = useState(false);
 

  const handleShow = () => setShow(true);
  const [patientDetails, setPatientDetails] = useState("");
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
      
       //set token from session storage
       const [token, setToken] = useState(sessionStorage.getItem("token_doctor"));
        //to set defaults of axios header
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const handleClose = () => {
    setShow(false);
  };
  // medicines corrusponding to patient
  const [medicines, setMedicines] = useState([]);


//function to remove assigned medicine by assigned medicineid
const deleteById=(id)=>{
  
  console.log("id recieved to delete in remove assinged medicine ---->"+id)
    const url = `${URL}/medicinesAssigned/removeMedicineAssigned/${id}`;
    axios.delete(url).then((res) => {
      
      const result = res.data;
      if (result.status == "success") {
       
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    });

}
//--------------------toggle data change flag
const toggleDataChangeFlag=()=>{
  setDataChangedFlag(true);
}

  // ====================togling edit modal
  const ToggleEditPatientModal = () => {
    setEditPatientFlag(true);
    handleShow();
  };
  //toggle add medicine button
  const ToggleAddMedicineModal = () => {
    setDataChangedFlag(true);
    setAddMedicineFlag(true);
    handleShow();
  };
  //checkk if id is recieved
  console.log("id recieved in PatientDetailsDoctor : " + patientId);
  const GetAllMedicineOfPatientFromServer = () => {
    setDataChangedFlag(false); //to refresh the page to update to current values
    const url = `${URL}/patient/getMedicines/${patientId}`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setMedicines(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    });
  };

  // ==========================*****************get patient from server

  const getPatientFromServer = () => {
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
    });
  };
  const setDataToTrue=()=>{
    setDataChangedFlag(true);
  }
  useEffect(() => {
    getPatientFromServer();
    GetAllMedicineOfPatientFromServer();
    
  }, [dataChangedFlag]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="d-flex justify-content-between container-fluid" style={{width:"50%"}}>
        <div className="p-2 bd-highlight">
          <Button onClick={ToggleEditPatientModal} variant="success">
            Add prescription
          </Button>
        </div>

        {/* add medicine button */}
        <div className="p-2 bd-highlight">
          <Button onClick={ToggleAddMedicineModal} variant="info">
            Add Medicine
          </Button>
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
        {/* --------------------------to add medicine---------------------------------------------- */}
        {addMedicineFlag && (
          <AddMedicines
            patientDetails={patientDetails}
            setDataToTrue={setDataToTrue}
            setDataChangedFlag={setDataChangedFlag}
            dataChangedFlag={dataChangedFlag}
            setAddMedicineFlag={setAddMedicineFlag}
            handleClose={handleClose}
            show={show}
          />
        )}

        {/* --------------------------to add prescription---------------------------------------------- */}
        {editPatientFlag && (
          <AddPrescription
            patientDetails={patientDetails}
            toggleDataChangeFlag={toggleDataChangeFlag}
            dataChangedFlag={dataChangedFlag}
            setEditPatientFlag={setEditPatientFlag}
            handleClose={handleClose}
            show={show}
          />
        )}
      </div>
     <center>
     <table className="table table-hover doctorPatientList">
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
            <th>Doctor Phone No </th> <td>{patientDetails.doctorCellNo}</td>
          </tr>
          <tr>
            <th>Date of admission </th>{" "}
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
            <th>Patient Problem </th> <td>{patientDetails.patientProblem}</td>
          </tr>
          <tr>
            <th>Prescription </th>{" "}
            <td>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={patientDetails.prescription}
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
              <table className="medicineList ">
                <tr>
                  <th>Medicine</th>
                  <th>No of tablets</th>
                  <th>Prescription</th>
                  <th></th>
                </tr>
                
                { medicines.map((medicine) => {
                  return <MedicineForDoctorPage setDataToTrue={setDataToTrue}  deleteById={deleteById} medicine={medicine} />;
                })}
              </table>
            </td>
          </tr>
        </tbody>
      </table>

     </center>
      <div className="p-2 bd-highlight">
          <Button
            variant="secondary"
            onClick={() => {
              console.log("doctor id----->"+patientDetails.doctorId)
              navigate("/doctor", { state: { doctorId: patientDetails.doctorId } });
            }}
          >
            Goback
          </Button>
        </div>
    </div>
  );
}

export default PatientDetailsDoctor;
