import React, { useEffect, useState } from "react";

const Data = () => {
  const [reRender, setReRender] = useState(false);
  //this will add data into API
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/userinfo", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setShowData(data); // data is an array of objects
        setReRender(!reRender); //!reRender will true every time
      });
  }, [reRender]);

  return (
    <>
      <h2 className="fw-bold">User Info</h2>
      <table className="table mt-3 table-striped table-hover ">
        <thead className="table-dark">
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
          </tr>
        </thead>
        <tbody>
          {showData.map((user) => (
            <tr key={user.id}>
              <td>{user.inputUserName}</td>
              <td>{user.inputEmail}</td>
              <td>{user.inputPass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Data;
