import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    rollno: "",
    gender: "",
    image: null,
    user_status: "",
    error: "",
    success: false,
  });

  const {
    name,
    email,
    password,
    phone,
    rollno,
    gender,
    image,
    user_status,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone, rollno, gender, image, user_status })
      .then((data) => {
        console.log("DATA", data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone: "",
            rollno: "",
            gender: "",
            image: null,
            user_status: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Created Successfully <Link to="/signin">Login Now</Link>
          </div>
        </div>
      </div>
    );
  };

  const handleImageChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Check all Fields again
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">
                <b>Name</b>
              </label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Email</b>
              </label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Password</b>
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Phone</b>
              </label>
              <input
                className="form-control"
                type="number"
                value={phone}
                onChange={handleChange("phone")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Roll No</b>
              </label>
              <input
                className="form-control"
                type="number"
                value={rollno}
                onChange={handleChange("rollno")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Gender</b>
              </label>
              <input
                className="form-control"
                type="text"
                value={gender}
                onChange={handleChange("gender")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>User Status</b>
              </label>
              <input
                className="form-control"
                type="text"
                value={user_status}
                onChange={handleChange("user_status")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">
                <b>Image</b>
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                name="html"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </div>
  );
};

export default Signup;
