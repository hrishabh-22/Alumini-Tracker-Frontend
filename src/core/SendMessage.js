import React, { useState } from "react";
import Menu from "../components/Menu";
import { sendMessage } from "../apicalls/allapicalls";
import { getjwtemail } from "../auth";

const SendMessage = () => {
  const [AUTHOREMAIL, SetAUTHOREMAIL] = useState(getjwtemail());
  const [sendMessages, setSendMessages] = useState({
    sender: AUTHOREMAIL,
    receiver: "",
    description: "",
    image: "",
    error: "",
    success: false,
  });

  const { sender, receiver, description, image } = sendMessages;

  const handleImageChange = (e) => {
    setSendMessages({ ...sendMessages, image: e.target.files[0] });
  };

  const handleChange = (name) => (event) => {
    setSendMessages({
      ...sendMessages,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSendMessages({
      ...sendMessages,
      error: false,
    });
    console.log("values: ", sendMessages);
    sendMessage({ sender, receiver, description, image })
      .then((data) => {
        console.log("Message DATA: ", data);
        if (data.receiver === receiver) {
          setSendMessages({
            ...sendMessages,
            sender: AUTHOREMAIL,
            receiver: "",
            description: "",
            image: "",
            error: "",
            success: true,
          });
          alert("Message Sent");
        } else {
          setSendMessages({
            ...sendMessages,
            error: true,
            success: false,
          });
          alert("Message Failed");
        }
      })
      .catch((error) => console.log(error));
  };

  const sendMessageForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">
                <b>To:</b>
              </label>
              <input
                className="form-control"
                type="email"
                value={receiver}
                onChange={handleChange("receiver")}
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
      {sendMessageForm()}
    </div>
  );
};

export default SendMessage;
