import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { URL } from "../../config";
import "./Accountant.css";
import PaymentStatusModal from "./paymentStatus";

function PatientDetailsAccountant(props) {
  const [flag, setFlag]=useState(true)
  const location = useLocation();
  const { patientId } = location.state;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [patientDetails, setPatientDetails] = useState("");
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [patientCharges, setPatientCharges] = useState({});
  const [patId, setPatId] = useState(patientDetails.patId);

  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_accountant"));
  //to set defaults of axios header
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const [paymentStatus, setPaymentStatus] = useState(
    patientDetails.paymentStatus
  );
  const [paymentStatusModalFlag, setPaymentStatusModalFlag] = useState(false);
  //checkk if id is recieved
  console.log("id recieved in patientDetailsReception : " + patientId);
  //toggle update status modal
  const ToggleUpdateStatusModal = () => {
    setPatId(patientId);
    console.log("in update payment status toggle -->");
    console.log("update status patId -->" + patId);
    console.log("update status paymentstatus -->" + paymentStatus);
    handleShow();
    setPaymentStatusModalFlag(true);
  };
  //update patient paymentstaus by id
  const UpdatePatientPaymentStatus = () => {
    const url = `${URL}/patient/updatePatientPaymentStatus`;
    const body = {
      patId,
      paymentStatus,
    };
    console.log("before sending data to update paymentStatus -->");
    console.log("update status patId -->" + patId);
    console.log("update status paymentstatus -->" + paymentStatus);
    axios.post(url, body).then((res) => {
      const result = res.data;
      console.log(result.data)
      if (result.status == "success") {
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err => {
      navigate("/error");
    });
  };
  //get total charges from server by patId
  const GetPatientChargesFromServer = () => {
    const url = `${URL}/patient/getCharges/${patientId}`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      const result = res.data;
      if (result.status == "success") {
        setPaymentStatus(result.data.paymentStatus)
        setPatientCharges(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err => {
      navigate("/error");
    });
  };
  // ==========================get patient from server

  const getPatientsFromServer = () => {
    const url = `${URL}/patient/getPatient/${patientId}`;
    axios.get(url).then((res) => {
      
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        setPatientDetails(result.data);
        setPaymentStatus(result.data.paymentStatus)
        console.log(result.data.paymentStatus);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err => {
      navigate("/error");
    });
  };
  //to together datachange flag to refresh the page
  const SetDataChangeFlag = () => {
    setDataChangedFlag(true);
  };
  useEffect(() => {
    getPatientsFromServer();
    GetPatientChargesFromServer();
    console.log(
      "inside useEffect of patientDetails------>reception" +
      " dataflag ===>" +
      dataChangedFlag
    );
  }, [dataChangedFlag]);

  const navigate = useNavigate();



  return (
    <div className="patientDetailsAccountant" >
      <div className="d-flex justify-content-between container-fluid" style={{ marginLeft: '50%', marginTop: '1%' }}>

        <div className="p-2 bd-highlight">
          <Button
            variant="warning"

            onClick={ToggleUpdateStatusModal}
          >
            Update Status
          </Button>
        </div>
        <div className="p-2 bd-highlight" style={{ marginLeft: '-10%' }} >
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/accountant");
            }}
          >
            Goback
          </Button>
        </div>
        <div className="p-2 bd-highlight" style={{ marginRight: '20%' }}>
          <Button
            variant="danger"
            onClick={() => {
              navigate("/signIn");
            }}
          >
            Logout
          </Button>
        </div>


      </div>

      <table
        className="patientDetailsAccountantTable table table-hover"
        style={{ marginLeft: '50%' }}
      >
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
            <th>Payment Status </th> {patientDetails.paymentStatus == "paid" ?

              <th style={{ backgroundColor: "lightgreen", fontWeight: "bold" }} >paid</th>
              : <th style={{ backgroundColor: "red", fontWeight: "bold" }} >pending</th>
            }
          </tr>
        </tbody>
      </table>
      <table
        className="chargesTable table table-hover "
        style={{ marginLeft: '50%' }}
      >
        <tr>
          <th>Sr.no</th>
          <th>Charges type</th>
          <th>Charges(Rs.)</th>
        </tr>
        <tr>
          <td>1</td> <td>Doctor Charges</td>{" "}
          <td>{"Rs." + patientCharges.doctorCharges}</td>
        </tr>
        <tr>
          <td>2</td> <td>Medicine Charges</td>{" "}
          <td>{"Rs." + patientCharges.medicineCharges}</td>
        </tr>
        <tr>
          <td>3</td> <td>Ward Charges</td>{" "}
          <td>{"Rs." + patientCharges.wardCharges}</td>
        </tr>
        <tr >
          <td colSpan={2} style={{ fontWeight: "bold", fontSize: "larger" }} >Total</td>{" "}
          <td style={{ backgroundColor: "lightgreen", fontWeight: "bold", fontSize: "larger" }}>
            Rs.
            {patientCharges.wardCharges +
              patientCharges.medicineCharges +
              patientCharges.doctorCharges}
          </td>
        </tr>
      </table>
      <table
        className="chargesTable table table-hover"
        style={{ marginLeft: '50%' }}
      >
        <tr>
          <th>Total Bill :</th>
          <th >
            Rs.
            {patientCharges.wardCharges +
              patientCharges.medicineCharges +
              patientCharges.doctorCharges}
          </th>
        </tr>
        <tr>
          <th>Payment Status</th>
          <th>{patientDetails.paymentStatus}</th>
        </tr>
      </table>

      {/* to toggle the updatestatus modal */}
      {paymentStatusModalFlag && (
        <PaymentStatusModal
          setPaymentStatusModalFlag={setPaymentStatusModalFlag}
          UpdatePatientPaymentStatus={UpdatePatientPaymentStatus}
          SetDataChangeFlag={SetDataChangeFlag}
          setPaymentStatus={setPaymentStatus}
          show={show}
          paymentStatus={paymentStatus}
          setShow={setShow}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      )
      
    }
    
    
    </div>

  );
}

export default PatientDetailsAccountant;
