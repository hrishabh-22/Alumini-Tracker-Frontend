import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { getMessage } from "../apicalls/allapicalls";
import Card from "./Card";
import { getjwtemail } from "../auth";
import Button from "@material-ui/core/Button";
import MessageCard from "./MessageCard";

const Message = (props) => {
  const [AUTHOREMAIL, SetAUTHOREMAIL] = useState(getjwtemail());
  const [allMessage, setAllMessage] = useState([]);
  const [send, setSend] = useState({
    sender: AUTHOREMAIL,
    receiver: "",
    description: "",
    image: null,
  });

  const [sendMessage, setSendMessage] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);

  const retrival = () => {
    getMessage()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(data.error);
        } else {
          setAllMessage(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    retrival();
  }, [refresh]);

  const refreshButton = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <Menu />

      <div style={{ paddingLeft: 20 }}>
        <br />
        <Button color="secondary" variant="outlined" onClick={refreshButton}>
          Refesh:
        </Button>
        <br />
        <br />
        <div className="row">
          <h4>Sent Mails:</h4>
          {allMessage
            .filter((message) => message.sender === AUTHOREMAIL)
            .map((message, index) => {
              return !message.image ? (
                <MessageCard
                  key={index}
                  desc={message.description}
                  author={message.receiver}
                />
              ) : (
                <Card
                  key={index}
                  image={message.image}
                  title={message.receiver}
                  desc={message.description}
                />
              );
            })}
        </div>
        <div className="row">
          <h4>Recieved Mails:</h4>
          {allMessage
            .filter((message) => message.receiver === AUTHOREMAIL)
            .map((message, index) => {
              return !message.image ? (
                <MessageCard
                  key={index}
                  author={message.sender}
                  desc={message.description}
                />
              ) : (
                <Card
                  key={index}
                  image={message.image}
                  title={message.sender}
                  desc={message.description}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Message;
