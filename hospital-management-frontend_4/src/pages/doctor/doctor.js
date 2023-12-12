import { Col, Container, Button, Image, Row, Navbar, Nav } from "react-bootstrap";


import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config";
import { useNavigate } from "react-router";
import "./doctor.css"
import PatientDoctor from "./component/patientDoctor";
import {  useLocation } from "react-router-dom";

const DoctorHome = () => {
    // ============================all constants=======================
        const [patients,setPatients]=useState([]);
        const [dataChangedFlag, setDataChangedFlag] = useState(false);
        const [search,setSearch]=useState("")
  //set token from session storage
  const [token, setToken] = useState(sessionStorage.getItem("token_doctor"));
   //to set defaults of axios header
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//************************=======fuctions=========--------------- */
    const location = useLocation();
     const { doctorId } = location.state;
    
    const getPatientsFromServer = () => {
      const url = `${URL}/doctor/getPatients/${doctorId}`;
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
    const navigate=useNavigate();
    //******************=-------------=======----------=======------------- */
  return (
    <div className="doctorContainer">

     <hr />
     <Navbar bg="" expand="lg" sticky="top" style={{marginLeft:"70%"}}>
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ color: "brown", fontWeight: "bold",background:"chartreuse" }}
          >
            Click For Options
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* ==============================add new patient==================== */}
              
              <Nav.Link>
              
                  <input
                    style={{
                      borderStyle: "solid",
                      borderRadius: "20px",
                      marginLeft: "10px",
                     

                    }}
                    placeholder="  Search by Name.."
                    onChange={e=>{
                      setSearch(e.target.value)
                    }}
                    type="text"
                  />
              </Nav.Link>
              
              <Nav.Link>
                {/* fourth menu operration */}
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
      <div className="container-fluid doctorPatientList">
        <table className="table table-hover table-bordered" >
          <thead>
            <tr>
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
                <PatientDoctor
                  patient={e}
                  setDataChangedFlag={setDataChangedFlag}
                  
                />
              );
            })}
          </tbody>
        </table>
      </div>
      {/* ================================================table container over========================== */}
    </div>
  );
};

export default DoctorHome;
