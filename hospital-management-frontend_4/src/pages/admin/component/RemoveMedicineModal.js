import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import axios from "axios";
import { URL } from "../../../config";
import MedicineAdminDetails from "./MedicineAdminDetails ";
import { useNavigate } from "react-router";

const RemoveMedicineModal = (props) => {
  const navigate = useNavigate();
     //set token from session storage
     const [token, setToken] = useState(sessionStorage.getItem("token_admin"));
     //to set defaults of axios header
     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const {
    show,
    setShow,
    handleClose,
    setDataChangedFlag,
    setRemoveMedicineModalFlag,
  } = props;

  const [dataChangeFlagRemoveMedicine, setDataChangeFlagRemoveMedicine] =
    useState(false);
  //to collect all wards from server
  const [medicines, setMedicines] = useState([]);
  //to get wards from server
  const GetAllMedicinesFromServer = () => {
    setDataChangeFlagRemoveMedicine(false)
    const url = `${URL}/medicine/getAllMedicines`;
    axios.get(url).then((res) => {
      const result = res.data;
      if (result.status == "success") {
        setMedicines(result.data);
        console.log(res);
      } else {
        console.log("unable to fetch result");
      }
    }).catch(err=>{
      navigate("/error");
  });
  };

  const togleDataFlag = () => {
    setDataChangeFlagRemoveMedicine(true);
  };
  useEffect(() => {
    GetAllMedicinesFromServer();
  }, [dataChangeFlagRemoveMedicine]);
  /**==================================================================== */
  return (
    <div className="">
     
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Remove Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table" style={{ textAlign: "center" }}>
            <tr>
              <th>Medicine Name</th>
              <th>Price</th>
            </tr>
            {medicines.map((medicine) => {
              return (
                <MedicineAdminDetails  medicine={medicine} togleDataFlag={togleDataFlag} />
              );
            })}
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ position: "relative", left: "-120px" }}>
            <Button
              size="sm"
              variant="warning"
              onClick={() => {
                setRemoveMedicineModalFlag(false);
                setShow(false);
              }}
            >
              Go back
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoveMedicineModal;
