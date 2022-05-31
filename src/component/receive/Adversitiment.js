import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListNew, getNew, removeArticle } from "../../Redux/action/articles";
import { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { Api } from "../Api";
import { useHistory } from "react-router-dom";
import {
  changeStateaAdminAnalytics,
  changeStateaAdminArticles,
  changeStateCheckNew,
} from "../../Redux/action/closeOpenComponet";
import Argrrenent from "./Argrrenent";

function Adversitiment() {
  let [page, setPage] = useState(1);
  let [listAv, setListAv] = useState([]);
  const [stateInput, setSateInput] = useState([]);
  let history = useHistory();

  const dispatch = useDispatch();
  const news = useSelector((state) => state.user.articles);
  console.log(">>>>.new length", news);
  const removeArticleManage = (id) => {};

  const fetchAvertisment = async () => {
    const response = await axios.get(Api().avertisment);
    let list = response.data.map((item) => false);
    setSateInput(list);
    return response.data;
  };

  const checkNew = (id) => {
    dispatch(changeStateaAdminArticles());
    dispatch(changeStateaAdminAnalytics());
    dispatch(changeStateCheckNew());
  };

  const fetchListNew = async () => {
    // const response = await axios.get(Api().articles)
    const response = await axios.get(Api().articlesfromtexted);
    dispatch(getListNew(response.data));
  };

  useEffect(() => {
    fetchAvertisment()
      .then((listAv) => setListAv(listAv))
      .catch((err) => console.log(err));
  }, []);

  // setPage(1)
  let perPage = 3;
  let start = (page - 1) * perPage;
  let end = page * perPage;

  const [newRender, setNewsRender] = useState(news.slice(start, end));
  const listNewsSearch = (e) => {
    let renderList = null;
    let { name, value } = e.target;
    console.log("value", value);
    renderList = news.filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    renderList == null ? setNewsRender(newRender) : setNewsRender(renderList);
  };

  console.log(" page line 21", page);
  const reduced = () => {
    if (page < 2) {
      setPage(1);
      console.log("page line 25", page);
    } else {
      console.log("page line 27", page);
      setPage(page - 1);
    }
    setNewsRender(news.slice(start, end));
    //   renderArticleManage()
  };
  const increase = () => {
    if (page >= news.length / 3) {
      setPage(1);
      console.log(page);
    } else {
      setPage(page + 1);
      console.log(page);
    }
    setNewsRender(news.slice(start, end));

    // renderArticleManage()
  };

  const seeAgreement = (item) => {
    const agreementimg = "/advertising/agreement/" + item
     history.push(agreementimg);

  };

  const deleteAd = async (advertismentId, detailsAdId) => {
    let result = await axios.delete(Api().avertisment, {
      params: { advertismentId, detailsAdId },
    });
    console.log("result", result);
    alert("delete success");
  };

  const updateAd = async (updateAd, valueUpdate) => {
      for (const key in valueUpdate) {
          if (valueUpdate[key].length === 0) {
              delete valueUpdate[key]
          }
      }
    let update = { ...updateAd, ...valueUpdate };
    let result = await axios.put(Api().avertisment, update);
        fetchAvertisment()
      .then((listAv) => setListAv(listAv))
      .catch((err) => console.log(err));
     alert("update success");
  };

  const [valueUpdate, setValueUpdate] = useState({
    title: "",
    imageAd: "",
    linkAd: "",
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setValueUpdate({
      ...valueUpdate,
      [name]: value,
    });
  };

  console.log("listAV",listAv)

  const addAvertisment = () => {
    history.push("/advertising/add")
  }
  const createAvertisment = () => {
    history.push("/advertising/create")
  }

  return (
    <div className="boxAd">
      <Header />
      {console.log("rereder page >>")}
      <div id="box">
        <div className="box-panel">
          <h1>advertising contract</h1>
          <button className="advertising_Add" onClick={addAvertisment}>Add Avertiments</button>
          <button className="advertising_Add" onClick={createAvertisment}>Create New Avertiments</button>
          <div className="header_search boxAdmin">
            <div className="header_search-ip">
              <input
                onChange={listNewsSearch}
                type="text"
                placeholder="Nhập nội dung tìm kiếm"
                defaultValue
              />
            </div>
            <button
              className="header_search-btn boxAdminsearchbtn"
              tabIndex={0}
              type="button"
              aria-label="Button"
            >
              <i className="bx bx-search" />
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>user</th>
                <th>agreement</th>
                <th>title</th>
                <th>image</th>
                <th>link</th>
                <th>active</th>
              </tr>
            </thead>
            <tbody>
              {listAv.map((item, key) => (
                <tr key={key}>
                  <td>{item.full_name}</td>
                  <td>
                    <button onClick={()=>seeAgreement(item.advertismentId)}>aggrement</button>
                  </td>
                  <td>
                    {stateInput[key] ? (
                      <input
                        name="title"
                        onChange={handleChange}
                        placeholder={item.title}
                      />
                    ) : (
                      <span>{item.title}</span>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 5,
                      }}
                    >
                      {/* <button className="btn_update">cập nhật</button> */}
                    </div>

                    {/* {item.title} */}
                  </td>
                  <td>
                    {stateInput[key] ? (
                      <input
                        name="imageAd"
                        onChange={handleChange}
                        placeholder={item.imageAd}
                      />
                    ) : (
                      <img style={{ width: "100px" }} src={item.imageAd} />
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 5,
                      }}
                    >
                      {/* <button className="btn_update">cập nhật</button> */}
                    </div>

                    {/* <img style={{ width: 100 }} src={item.imageAd} /> */}
                  </td>
                  <td>
                    {stateInput[key] ? (
                      <input
                        name="linkAd"
                        onChange={handleChange}
                        placeholder={item.linkAd}
                      />
                    ) : (
                      <a target={"_blank"} href={item.linkAd}>
                        {item.linkAd.length > 16
                          ? item.linkAd.substr(0, 16)
                          : item.linkAd}
                      </a>
                    )}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 5,
                      }}
                    >
                      {/* <button className="btn_update">cập nhật</button> */}
                    </div>

                    {/* <a target={"_blank"} href={item.linkAd}>
                      {item.linkAd && item.linkAd.length > 10
                        ? item.linkAd.substr(0, 10)
                        : item.listAv}
                    </a> */}
                  </td>
                  <td>
                  {stateInput[key] ?
                  <select name="checkAd" onChange={handleChange} defaultValue={item.checkAd}>
                      <option value={1}>
                          active
                      </option>
                      <option value={0}>
                          disable
                      </option>
                      </select>: <span>{item.checkAd == 1 ? "active":"disabled"}</span>
}
                      </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteAd(item.detailsAdId, item.advertismentId);
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                  <td>
                    { stateInput[key] ? 
                    <>
                    <button
                    style={{marginTop:"10px",marginRight:"5px"}}
                      onClick={() => {
                        updateAd(item, valueUpdate);
                      }}
                    >
                      UPDATE
                    </button> 
                    <button
                      onClick={() => {
                        let abc = [...stateInput];
                        abc[key] = !abc[key];
                        setSateInput([...abc]);
                        setValueUpdate({
                          title: "",
                          imageAd: "",
                          linkAd: "",
                        });
                      }}
                    >
                      {"CANCLE  "}
                    </button>
                    </>:
                    <button
                      onClick={() => {
                        let abc = [...stateInput];
                        abc[key] = !abc[key];
                        setSateInput([...abc]);
                        setValueUpdate({
                          title: "",
                          imageAd: "",
                          linkAd: "",
                        });
                      }}
                    >
                      EDIT
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="demochoichodui">
            <button onClick={reduced}>Prev</button>
            <button onClick={increase}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adversitiment;
