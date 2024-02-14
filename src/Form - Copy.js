import React, { useState, useEffect } from "react";

const Form = () => {
  // this will empty the form after
  const [formData, setFormData] = useState([
    {
      inputUserName: "",
      inputEmail: "",
      inputPass: "",
      userStatus: 1,
    },
  ]);

  //this will handle the onChange event for form
  const handleChange = (e, index) => {
    const newFormData = [...formData];
    newFormData[index][e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  //this will add data into the database
  const handleSubmit = (event, index) => {
    event.preventDefault();
    fetch("http://localhost:8000/userinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData[index]),
    }).then((res) => {
      setFormSubmitted(true);
      return res.json;
    });
  };

  // this will empty form after submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      setFormData([
        {
          inputUserName: "",
          inputEmail: "",
          inputPass: "",
          userStatus: 1,
        },
      ]);
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  //add/remove dom  element for multi inputs
  const [formCount, setFormCount] = useState(1);

  const addForm = () => {
    setFormCount(formCount + 1);
    setFormData([
      ...formData,
      { inputUserName: "", inputEmail: "", inputPass: "", userStatus: 1 },
    ]);
  };

  const removeForm = () => {
    if (formCount > 1) {
      setFormCount(formCount - 1);
      setFormData(formData.slice(0, -1));
    }
  };

  return (
    <>
      <h2 className="fw-bold">User Form</h2>
      <div className="container">
        {/* UserForm component */}
        {formData.map((el, index) => (
          <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
            <div className="row">
              <div className="mb-3 col-md-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id={`inputUserName${index}`}
                  name="inputUserName"
                  required
                  placeholder="Username"
                  value={el.inputUserName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="mb-3 col-md-4">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id={`inputEmail${index}`}
                  name="inputEmail"
                  required
                  placeholder="Email "
                  value={el.inputEmail}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="mb-3 col-md-3">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id={`inputPass${index}`}
                  name="inputPass"
                  required
                  placeholder="Password "
                  value={el.inputPass}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" col-md-1">
                <button className="btn btn-outline-success" onClick={addForm}>
                  +
                </button>
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={removeForm}
                >
                  -
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={!el.inputUserName || !el.inputEmail || !el.inputPass}
            >
              Submit
            </button>
          </form>
        ))}
      </div>
    </>
  );
};

export default Form;
