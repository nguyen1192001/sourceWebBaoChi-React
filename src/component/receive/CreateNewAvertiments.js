import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../Api";

function CreateNewAvertiments() {
  const qs = require("qs");
  const history = useHistory();
  const [UserId, setUserId] = useState("");
  const [Agreement, setaAgreement] = useState("");
const [listUser,setListUser]  = useState([])

  const fetchListUsers = async () => {
    const response = await axios.get(Api().SelfDefUser);
    setListUser(response.data);
  };
  useEffect(() => {
    fetchListUsers();
  }, []);


  console.log(">>>>>listUser",listUser)

  const renderAverId = listUser.map((item) => {
    return <option value={item.userId} />;
  });

  const login = () => {
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    let Av = qs.stringify({ UserId, Agreement});
    axios
      .post(Api().avertisment, Av, config)
      .then(() => {
        alert("add news success");
        setaAgreement("");
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
        <span>Create New Avertisment</span>
      </div>
      <div className="menu">
        <input
          list="browsers"
          name="myBrowser"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        <datalist id="browsers">{renderAverId}</datalist>
      </div>
      <div className="journalist">
        <div className="journalist_title">
          <input
            type="text"
            defaultValue="Agreement"
            onChange={(e) => {
                setaAgreement(e.target.value);
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
export default CreateNewAvertiments;
