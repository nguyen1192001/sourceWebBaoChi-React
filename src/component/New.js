import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "./Api";
import { getCategories } from "../Redux/action/categories";
import Comment from "./Comment";
import NewComment from "./NewComment";

function New() {
  const news = useSelector((state) => state.user.article);

  console.log(">>>>>.... articles",news)
  const categoties = useSelector((state) => state.journalist.categoties);

  let nameCate = categoties.find((item) => item.cate_id == news.cate_id);

  return (
    <div className="my-container">
      <div className="article_topic">
        <span>{nameCate ? nameCate.cate_name : ""}</span>
      </div>
      <div className="article_title">
        <span>{news.title}</span>
      </div>
      <div className="article_time">
        <span>{news.create_time}</span>
      </div>
      <div className="article_content">
        <div className="article_content_img">
          <img src={news.image} alt="" />
        </div>
        <p>{news.textbody}</p>
      </div>
      <div className="article_author">
        <span>thao nguyen / tong hop</span>
      </div>
      <Comment item={news} />
    </div>
  );
}

export default New;
