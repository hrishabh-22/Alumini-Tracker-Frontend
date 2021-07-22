import React, { useState } from "react";
import { addProject } from "../apicalls/allapicalls";
import Menu from "../components/Menu";
import { getjwtemail } from "../auth/index";

const Project = (props) => {
  const [AUTHOREMAIL, SetAUTHOREMAIL] = useState(getjwtemail());
  const [values, setValues] = useState({
    author: AUTHOREMAIL,
    title: "",
    description: "",
    image: null,
    github_url: "",
    error: "",
    success: "false",
  });

  const { author, title, description, image, github_url } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleImageChange = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });
    addProject({ author, title, description, image, github_url })
      .then((data) => {
        if (data.title === title) {
          setValues({
            ...values,
            author: AUTHOREMAIL,
            title: "",
            description: "",
            image: null,
            github_url: "",
            error: "",
            success: true,
          });
          alert("Project Added Successfully");
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
          alert("Project Added Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const addProjectForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Title</label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={handleChange("title")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={handleChange("description")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark">Github Url</label>
              <input
                className="form-control"
                type="text"
                value={github_url}
                onChange={handleChange("github_url")}
              />
            </div>
            <div className="form-group">
              <label className="text-dark" htmlFor="image">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
                name="html"
                title=" "
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
      <Menu />

      {addProjectForm()}
    </div>
  );
};

export default Project;
