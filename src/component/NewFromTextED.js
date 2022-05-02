import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../Redux/action/categories";
import Comment from "./Comment";


function NewFromTextED() {
  const news = useSelector((state) => state.user.article);
  console.log(">>>>>.... articles", news)
  const categoties = useSelector((state) => state.journalist.categoties);

  let nameCate = categoties.find((item) => item.cate_id == news.cate_id);
  useEffect(()=>{
    document.querySelector(".article_content").innerHTML = news.content
  },[news])
  
  return (
    <div className="my-container">
      <div className="article_topic">
        <span>{nameCate ? nameCate.cate_name : ""}</span>
      </div>
      <div className="article_time">
        <span>{news.create_time}</span>
      </div>
      <div className="article_content">
       
      </div>
      <Comment item={news._id} />
    </div>


  );
}

export default NewFromTextED;
