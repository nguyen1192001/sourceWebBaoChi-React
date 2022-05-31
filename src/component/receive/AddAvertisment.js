import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../Api";

function AddAvertisment() {
  const qs = require("qs");
  const history = useHistory();
  const [AvId, setAvId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [linkAv, setlinkAv] = useState("");
  const [startAv, setstartAv] = useState("");
  const [endAv, setendAv] = useState("");
  const [listAver, setListAv] = useState([]);

  const resetInput  = () =>{
    setAvId("")
    setTitle("")
    setImage("")
    setlinkAv("")
    setstartAv("")
    setendAv("")
}

  const fetchMainAvertisment = async () => {
    const response = await axios.get(Api().mainAvertisment);
    setListAv(response.data);
  };
  useEffect(() => {
    fetchMainAvertisment();
  }, []);

  const renderAverId = listAver.map((item) => {
    return <option value={item.advertismentId} />;
  });

  const login = () => {
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    let mainAv = qs.stringify({ AvId, title, image, linkAv, startAv, endAv });
    axios
      .post(Api().mainAvertisment, mainAv, config)
      .then(() => {
        alert("add news success");
        resetInput()
      })
      .catch((err) => {
        console.log("hông add được bé ơi", err);
      });
  };
  const Back = () => {
    history.push("/advertising");
  };

  return (
    <div className="my-container">
      <div className="article_topic">
        <span>Add Avertisment</span>
      </div>
      <div className="menu">
        <input
          list="browsers"
          name="myBrowser"
          onChange={(e) => {
            setAvId(e.target.value);
          }}
        />
        <datalist id="browsers">{renderAverId}</datalist>
      </div>
      <div className="journalist">
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="images"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="link"
            onChange={(e) => {
              setlinkAv(e.target.value);
            }}
          />
        </div>
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="start"
            onChange={(e) => {
              setstartAv(e.target.value);
            }}
          />
        </div>
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="end"
            onChange={(e) => {
              setendAv(e.target.value);
            }}
          />
        </div>
        <div className="contentBox-btn">
          <button onClick={login}>Submit New</button>
          <button onClick={Back}>Back</button>
        </div>
      </div>
    </div>
  );
}
export default AddAvertisment;
