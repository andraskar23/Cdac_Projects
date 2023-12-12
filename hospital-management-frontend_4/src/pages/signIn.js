import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WardTableSignIn from "../components/signin/wardTable"
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "../components/full.css";
import { Link } from "react-router-dom";

import axios from "axios";
import { URL } from "../config";
import "./signIn.css";

const SignIn = () => {
  const [role, setRole] = useState("Select Role");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [wards, setWards] = useState([]);
  let user;

  const GetWardsFromServer = () => {
    const url = `${URL}/ward/getAllWards`;
    axios
      .get(url)
      .then((res) => {
        const result = res.data;
        if (result.status === "success") {
          setWards(result.data);
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  };

  const getUserFromServer = () => {
    const body = {
      email,
      password,
      role,
    };
    if (role === "Select Role") {
      toast.warning("Please select a role", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const url = `${URL}/user/authenticate`;
      axios
        .post(url, body)
        .then((req) => {
          const result = req.data;

          if (result.data !== "invalid_credential" && result.status === "success") {
            user = result.data;
            sessionStorage.setItem(`token_${user.role}`, result.data.token);

            if (role === user.role) {
              toast.success("Logged in successfully", {
                position: toast.POSITION.TOP_CENTER,
              });

              // Navigate based on the user's role
              const routeMap = {
                patient: "/patientDetails",
                admin: "/admin",
                reception: "/reception",
                doctor: "/doctor",
                accountant: "/accountant",
              };
              if(role==="doctor"){
                navigate(routeMap[role],{state:{ doctorId: user.doctorId  }});
              }
              else if(role==="patient"){
                navigate(routeMap[role], { state: { patId: user.patId } });
              }
              else{
                navigate(routeMap[role]);
              }
              
            }
          } else {
            navigate("/signIn");
            toast.warning("Invalid credentials", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch(() => {
          navigate("/error");
        });
    }
  };

  useEffect(() => {
    GetWardsFromServer();
  }, []);

  return (<>
  <br/>
    <Container fluid className="signInContainer">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={9}>
          <div className="signInForm">
            
            <DropdownButton
              size="lg"
              title={role}
              variant="primary"
              className="roleDropdown"
            >
              {/* Dropdown items */}
                    <Dropdown.Item as="Button">
                      <div
                        id="setAdmin"
                        onClick={(e) => {
                          setRole(e.target.innerText);
                        }}
                      >
                        admin
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        id=""
                        onClick={(e) => {
                          setRole(e.target.innerText);
                        }}
                      >
                        accountant
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={(e) => {
                          setRole(e.target.innerText);
                        }}
                      >
                        reception
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={(e) => {
                          setRole(e.target.innerText);
                        }}
                      >
                        patient
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <div
                        onClick={(e) => {
                          setRole(e.target.innerText);
                        }}
                      >
                        doctor
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
            <Form>
              <Form.Group controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <br/>
              <Button
                variant="success"
                size="lg"
                block
                onClick={() => getUserFromServer()}
              >
                Log In
              </Button>
              <br/>
              <Link to="/resetPassword" className="forgotPasswordLink">
                Forgot Password?
              </Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    <div className="table-container centered-table">
      <table className="table table-hover"
     style={{ float: "", margin: "20px", border: "solid", width: "100px" }}>
     <thead >
       <tr>
         <th>Ward type</th>
         <th>Beds Available</th>
         <th>Max Capacity</th>
       </tr>
     </thead>
     <tbody className="tableBody">
       {wards.map((ward) => {
         return <WardTableSignIn ward={ward} />;
       })}
     </tbody>
   </table>
   </div>
   </>
  );
};

export default SignIn;
