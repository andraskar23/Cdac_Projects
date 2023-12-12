
import { Button } from "react-bootstrap";
import "./employee.css"

const Employee = (props) => {
  const { employee, updateEmployee } = props;

  return (
    <tr className="employee-row">
      <td>{employee.empId}</td>
      <td>{employee.firstName + " " + employee.lastName}</td>
      <td>{employee.cellNo}</td>
      <td>{employee.role}</td>
      <td>{employee.dob}</td>
      <td>{employee.hireDate}</td>
      <td>{employee.salary}</td>
      <td>
        <Button
          className="btn btn-info"
          
          size="sm"
          style={{ fontSize: "small" }}
          onClick={() => {
            console.log("empid in employee component" + employee.empId);
            updateEmployee(employee.empId,employee);
          }}
        >
          update
        </Button>
      </td>
    </tr>
  );
};
export default Employee;
