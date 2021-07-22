import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { getjwtemail, getjwtid } from "../auth";
import { userDetail } from "../apicalls/allapicalls";
import TextField from "@material-ui/core/TextField";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Button from "@material-ui/core/Button";

const Profile = (props) => {
  const [email, setEmail] = useState(getjwtemail());
  const [id, setId] = useState(getjwtid());
  const [URLMATCHER, setURLMATCHER] = useState(
    `http://localhost:8000/api/user/${id}/`
  );
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(false);

  const detailUser = () => {
    userDetail(URLMATCHER)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUser(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    detailUser();
  }, []);

  const showProfile = () => {
    setProfile(!profile);
  };

  return (
    <div>
      <Button color="secondary" variant="outlined" onClick={showProfile}>
        Display Profile
      </Button>
      {!profile ? null : (
        <div style={{ height: 600, width: 600, border: "2px solid black" }}>
          <center>
            <div style={{ height: 150, width: 150, border: "1px solid black" }}>
              <img src={user.image} style={{ height: 150, width: 150 }} />
              {!user.verified ? (
                "Not Verified"
              ) : (
                <VerifiedUserIcon style={{ color: "blue" }} />
              )}
            </div>
            <br />
            <br />
            <div>
              <lable style={{ marginRight: 30 }}>Name:</lable>
              <TextField
                defaultValue={user.name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <br />
            <br />
            <div>
              <lable style={{ marginRight: 30 }}>Email:</lable>
              <TextField
                defaultValue={user.email}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <br />
            <br />
            <div>
              <lable style={{ marginRight: 30 }}>Phone:</lable>
              <TextField
                defaultValue={user.phone}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <br />
            <br />
            <div>
              <lable style={{ marginRight: 30 }}>Roll No:</lable>
              <TextField
                defaultValue={user.rollno}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <br />
            <br />
            <div>
              <lable style={{ marginRight: 30 }}>User Type:</lable>
              <TextField
                defaultValue={user.user_status}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </center>
        </div>
      )}
    </div>
  );
};

export default Profile;
