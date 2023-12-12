import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { URL } from "../../config";
import "./Accountant.css";

import PatientAccountant from "./patientAccountant";

const Accountant = () => {

  // ============================all constants=======================
  const [show, setShow] = useState(false);
  const [patients, setPatients] = useState([]);
  const [dataChangedFlag, setDataChangedFlag] = useState(false);
  const [search,setSearch]=useState("")
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_accountant"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //************************=======fuctions=========--------------- */

  const getPatientsFromServer = () => {
    const url = `${URL}/patient/getAllPatients`;
    axios.get(url).then((res) => {
      setDataChangedFlag(false);
      console.log("data flag inside getEmployeesFromServer " + dataChangedFlag);
      const result = res.data;
      if (result.status == "success") {
        setPatients(result.data);
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
    console.log("inside useEffect of adminDetails");
  }, [dataChangedFlag]);
  const navigate = useNavigate();
  //******************=-------------=======----------=======------------- */
  return (
    <div className="doctorContainer" >
       <Navbar bg="" expand="lg" sticky="top" style={{marginLeft:'70%'}}>
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ color: "brown", fontWeight: "bold",background:"chartreuse" }}
          >
            Click For Options
          </Navbar.Toggle>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* ==============================ato log out==================== */}
              <Nav.Link >
                  <input
                    style={{
                      borderStyle: "solid",
                      borderRadius: "20px",
                      marginLeft: "10px",
                      textAlign: 'center'

                    }}
                    placeholder="  Search by Name.. "
                    onChange={e=>{
                      setSearch(e.target.value)
                    }}
                    type="text"
                  />
              </Nav.Link>
              <Nav.Link>
                {/* fourth menu operation */}
                <Button
                  variant="danger"
                  onClick={() => {
                    navigate("/signIn");
                  }}
                >
                  Logout
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      

     
      {/* =======================================table container of patients====================================== */}
      <div className="container-fluid">
        <table className="table table-hover patient-table">
          <thead>
            <tr className="table-heading">
              <th scope="col">Patient Id</th>
              <th scope="col">Name</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {patients.filter((e)=>{
               if(search=="")
               return e;
               else
               if((`${e.firstName}+" "+${e.lastName}`).toLocaleLowerCase().includes(search.toLocaleLowerCase()) )
               return e;

            }).map((e) => {
              return (
                <PatientAccountant patient={e} setDataChangedFlag={setDataChangedFlag} />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* ================================================table container over========================== */}
    </div>
  );
};

export default Accountant;
