import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getListNew, getNew } from "../Redux/action/articles";
import {
  changeStateHome,
  changeStateNews,
} from "../Redux/action/closeOpenComponet";
import { Api } from "./Api";

function HomeToTopic() {
  const dispatch = useDispatch();

  const fetchListNew = async () => {
    const response = await axios.get(Api().articlesfromtexted);
    dispatch(getListNew(response.data));
  };

  useEffect(() => {
    fetchListNew();
  }, []);

  const fetchNew = async (idNew) => {
    const response = await axios.get(Api().articlesfromtexted + "/" + idNew);
    dispatch(getNew(response.data));
  };

  const selectNew = (id) => {
    fetchNew(id);
    dispatch(changeStateHome());
    dispatch(changeStateNews());
  };

  const news = useSelector((state) => state.user.artilesToMenu);

  const renderFirstNew = news.map((item, index) => {
    if (index < 1) {
      return (
        <div
          className="first-new"
          onClick={() => {
            selectNew(item.article_id);
          }}
        >
          <div className="first-new-img">
            <img src={item.image} alt="" />
          </div>
          <div className="first-new-title">
            <a>
              <span>{item.title}</span>
            </a>
          </div>
        </div>
      );
    }
  });
  const renderThirdNew = news.map((item, index) => {
    return (
      <li
        className="categories-new-item"
        onClick={() => {
          selectNew(item.article_id);
        }}
      >
        <div className="categories-img">
          <img src={item.image} alt="" />
        </div>
        <div className="categories-title thirdNew-title">
          <a>
            <span>{item.title}</span>
          </a>
        </div>
      </li>
    );
  });

  const categoties = useSelector((state) => state.journalist.categoties);
  let nameCate;
  news.length == 0
    ? (nameCate = false)
    : (nameCate = categoties.find((item) => item.cate_id == news[0].cate_id));

  return (
    <>
      {nameCate ? (
        <div className="my-container">
          <div className="my-grid">
            <div className="my-row">
              <div className="my-col-12">
                <div className="article_topic">
                  <span>{nameCate ? nameCate.cate_name : ""}</span>
                </div>
                {renderFirstNew}

                <ul className="categories-new">{renderThirdNew}</ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-container none_topic">
          chưa có bài viết cho thể loại này{" "}
        </div>
      )}
    </>
  );
}

export default HomeToTopic;
