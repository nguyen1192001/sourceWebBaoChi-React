import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../Api";

function Argrrenent(props) {
  const idparams = props.match.params.id;
  const [OneAdvertisment, SetAV] = useState([]);
  const fetchOneAvertisment = async () => {
    const response = await axios.get(Api().avertisment + "/" + idparams);
    SetAV(response.data);
  };
  useEffect(() => {
    fetchOneAvertisment()
  }, []);

  let history = useHistory();

  const backAgreement = () => {
    history.push("/advertising");
  };

  return (
    <div className="my-container">
      {
          OneAdvertisment[0] ? (<img
            src={OneAdvertisment[0].agreement}
            alt="pho"
          />):(<img src="https://luatnhandan.vn/wp-content/uploads/2020/02/mau-hop-dong-quang-cao-1.jpg"/>)
      }

      <button onClick={backAgreement} className="agreementBtn">
        BACK
      </button>
    </div>
  );
}
export default Argrrenent;
