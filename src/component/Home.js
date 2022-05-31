import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getListComment, getListNew, getNew } from "../Redux/action/articles";
import {
  changeStateHome,
  changeStateNews,
} from "../Redux/action/closeOpenComponet";
import { Api } from "./Api";

function Home() {
  const dispatch = useDispatch();
  const [listImgAV , setListImgAv] = useState([])

  const fetchListNew = async () => {
    const response = await axios.get(Api().articlesfromtexted);
    console.log("home response data", response.data)
    dispatch(getListNew(response.data));
  };

  useEffect(() => {
    fetchListNew();
    fetchAvertisment().then(lisAv => setListImgAv(lisAv)).catch(err=>console.log(err))
  }, []);

  const fetchNew = async (idNew) => {
    const response = await axios.get(Api().articlesfromtexted + "/" + idNew);
    console.log(">>>>>>>..", response.data)
    dispatch(getNew(response.data[0]))
  };

  const fetchAvertisment = async () => {
    const response = await axios.get(Api().avertisment);
    return response.data.filter(ad => ad.checkAd == 1).splice(0,2)
};

  const selectNew = async (id) => {
    // const response = await axios.get(Api().commnet);
    // response.data.forEach((element) => {
    //   if (element.articleId == id) {
    //     dispatch(getListComment(element));
    //   }
    // });
    fetchNew(id);
    dispatch(changeStateHome());
    dispatch(changeStateNews());
  };

  let news = useSelector((state) => state.user.articles);
  news = news.filter((item) => {
    return item.checknew == 0
  })

  const renderFirstNew = news.map((item, index) => {
    if (index < 1) {
      return (
        <div
          className="first-new"
          onClick={() => {
            selectNew(item.articleId);
          }}
        >
          <div className="first-new-img">
            <img src={item.imagenew} alt="" />
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
  const renderSecondNew = news.map((item, index) => {
    if (index < 3) {
      return (
        <div
          className="seconedNew-talkBar-item"
          onClick={() => {
            selectNew(item.articleId);
          }}
        >
          <div className="seconedNew-talkBar-item-img">
            <img src={item.imagenew} alt="" />
          </div>
          <div className="seconedNew-talkBar-item-title">
            <a>
              <span>{item.title}</span>
            </a>
          </div>
        </div>
      );
    }
  });
  const renderThirdNew = news.map((item, index) => {
    if (index > 3 && index < 7) {
      return (
        <li
          className="categories-new-item"
          onClick={() => {
            selectNew(item.articleId);
          }}
        >
          <div className="categories-img">
            <img src={item.imagenew} alt="" />
          </div>
          <div className="categories-title thirdNew-title">
            <a>
              <span>{item.title}</span>
            </a>
          </div>
        </li>
      );
    }
  });

  const renderCategories = news.map((item, index) => {
    if (index < 7) {
      return (
        <li
          className="categories-new-item"
          onClick={() => {
            selectNew(item.articleId);
          }}
        >
          <div className="categories-img">
            <img src={item.imagenew} alt="" />
          </div>
          <div className="categories-title">
            <a>
              <span>{item.title}</span>
            </a>
          </div>
        </li>
      );
    }
  });

  console.log(">>>>>listImgAV",listImgAV)

  return (
    <div className="my-container">
      <div className="my-grid">
        <div className="my-row">
          <div className="col-2">
          {listImgAV.map((item)=><>
            <div className="box-Adverstiment">
              <a href={item.linkAd}>
              <img src={item.imageAd} alt="" />
              </a>
            </div>
          </>)}
           
          </div>
          <div className="col-10">
            <div className="my-row">
              <div className="my-col-8">
                {renderFirstNew}
                <nav className="seconedNew-talkBar">{renderSecondNew}</nav>
                <ul className="categories-new">{renderThirdNew}</ul>
              </div>
              <div className="col-4">
                <ul className="categories-new">{renderCategories}</ul>
                <div className="banner">
                  <a href="/chu-tich-ho-chi-minh/top/114.epi" className>
                    <figure className="banner_img">
                      <img
                        src="//baomoi-static.zadn.vn/events/banner_hcm_02-min.png"
                        alt=""
                        className="bm_Bj"
                      />
                    </figure>
                  </a>
                </div>
                
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Home;
