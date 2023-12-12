import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
const PatientDoctor = (props) => {
  const { patient, handleShow,setDataChangedFlag } = props;
  const navigate=useNavigate();
  return (
    <tr>
      <td>{patient.patId}</td>
      <td>{patient.firstName + " " + patient.lastName}</td>
      <td>{patient.paymentStatus}</td>
      <td>
        <Button
          variant="info"
          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in patient component" + patient.empId);
            navigate("/doctor/patientDetails",{state:{patientId:patient.patId}})
          }}
        >
         details
        </Button>
      </td>
    </tr>
  );
};
export default PatientDoctor;
