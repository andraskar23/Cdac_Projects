
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Accountant.css"
const PatientAccountant = (props) => {
  const { patient, handleShow, setDataChangedFlag } = props;
  const navigate = useNavigate();
  return (
    <tr className="patient-row">
      <td>{patient.patId}</td>
      <td>{patient.firstName + " " + patient.lastName}</td>
      <td>{patient.paymentStatus}</td>
      <td>
        <Button
          className="btn btn-info"
          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in patient component" + patient.empId);
            navigate("/accountant/patientDetails", {
              state: { patientId: patient.patId },
            });
          }}
        >
          Invoice
        </Button>
      </td>
      </tr>
  );
};
export default PatientAccountant;
