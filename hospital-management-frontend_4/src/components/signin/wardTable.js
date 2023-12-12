import React from "react";
import "./wardTable.css"

const WardTableSignIn = (props) => {
  const { ward } = props;
  return (
    <tr className="textColor">
      <td >{ward.type}</td>
      <td>{ward.availability}</td>
      <td>{ward.maxCapacity}</td>
    </tr>
  );
};

export default WardTableSignIn;
