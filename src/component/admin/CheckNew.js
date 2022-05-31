import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Api } from "../Api";
import { removeArticle } from "../../Redux/action/articles";
import {
  changeStateaAdminArticles,
  changeStateCheckNew,
} from "../../Redux/action/closeOpenComponet";
import { useHistory } from "react-router-dom";

const qs = require("qs");

function NewFromTextED(props) {
  //   console.log(">>>>>.news", news);
  const history = useHistory();
  const dispatch = useDispatch();
  //   const news = useSelector((state) => state.user.article);
  const id = props.match.params.id;
  const [ConsiderArticles, setConsiderArticles] = useState([]);

  const fetchOneArticles = async () => {
    const response = await axios.get(Api().articlesfromtexted + "/" + id);
    console.log("response data", response.data);
    setConsiderArticles(response.data);
  };

  useEffect(() => {
    fetchOneArticles();
  }, []);
  let news = ConsiderArticles[0];

  const deleteArticles = (id) => {
    axios.delete(Api().articlesfromtexted + "/" + id)
    .then(() =>{
        alert("delete success!!!")
        dispatch(removeArticle(news.articleId))
        history.push("/dmin")

    })
    .catch((err)=>{
        console.log(err)
    })
  };
  const postArticles = (id) => {
   
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    let changeCheck = qs.stringify({ check: 0 });
    axios
      .put(Api().articlesfromtexted + "/" + id, changeCheck, config)
      .then((item) => {
        alert("post success");
        history.push("/dmin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backArticles = () => {
    history.push("/dmin");
  };

  return (
    <div className="my-container">
      <div className="article_topic">
        <span>{news ? news.title : ""}</span>
      </div>
      <div className="article_time">{news ? news.create_time : ""}</div>
      <div className="article_content">
          {console.log(document.querySelector(".article_content"))}
        {
        news 
          ? (document.querySelector(".article_content").innerHTML =
            news.content)
          : ""}
      </div>
      <div className="groupBtn">
        <button className="submit-jounalist" onClick={()=>deleteArticles(news.articleId)}>
          DELETE
        </button>
        <button
          className="submit-jounalist"
          onClick={() => postArticles(news.articleId)}
        >
          POST
        </button>
        <button className="submit-jounalist" onClick={backArticles}>
          BACK
        </button>
      </div>
    </div>
  );
}

export default NewFromTextED;
