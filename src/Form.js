import React, { useState, useEffect } from "react";

const Form = () => {
  // this is the starting stage of form
  const [formData, setFormData] = useState([
    {
      inputUserName: "",
      inputEmail: "",
      inputPass: "",
      userStatus: 1,
    },
  ]);

  //this will handle value of inputs
  const handleChange = (e, index) => {
    const newFormData = [...formData];
    newFormData[index][e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  //this will add data to api
  const handleSubmit = (event) => {
    event.preventDefault();
    formData.forEach((data, index) => {
      fetch("http://localhost:8000/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (index === formData.length - 1) {
            setFormSubmitted(true);
          }
        });
    });
  };

  // this will count form
  const [formCount, setFormCount] = useState(1);
  // this will add form
  const addForm = () => {
    setFormCount(formCount + 1);
    setFormData([
      ...formData,
      { inputUserName: "", inputEmail: "", inputPass: "", userStatus: 1 },
    ]);
  };
  // this will remove form
  const removeForm = (index) => {
    if (formCount > 1) {
      const newFormData = [...formData];
      newFormData.splice(index, 1);
      console.log(newFormData);
      setFormData(newFormData);
      setFormCount(formCount - 1);
    }
  };

  // onsubmit this will clear form
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

  return (
    <>
      <h2 className="fw-bold">User Form</h2>
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          {formData.map((el, index) => (
            <div className="row" key={index}>
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
                  placeholder="Email"
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
                  placeholder="Password"
                  value={el.inputPass}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className=" col-md-1">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={addForm}
                >
                  +
                </button>
                {index === 0 ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-danger ms-2"
                    onClick={() => removeForm(index)}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
