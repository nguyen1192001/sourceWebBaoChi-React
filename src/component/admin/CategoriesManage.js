import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, removeCategories } from "../../Redux/action/categories";
import { Api } from "../Api";
import CateItem from "./CateItem";

export default function CategoriesManage() {
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);

  const categories = useSelector((state) => state.cate.categories);

  const fetchListCategories = async () => {
    const response = await axios.get(Api().categories);
    dispatch(getCategories(response.data));
  };
  useEffect(() => {
    fetchListCategories();
  }, []);

  let perPage = 3;
  let start = (page - 1) * perPage;
  let end = page * perPage;

  const [cateRender, setCateRender] = useState(categories.slice(start, end));
  const listCateSearch = (e) => {
    let renderList = null;
    let { value } = e.target;
    renderList = categories.filter((item) => {
      return item.cate_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    renderList == null ? setCateRender(cateRender) : setCateRender(renderList);
  };
  const renderCategories = cateRender.map((item) => {
    return (
      <>
        <CateItem item={item} />
      </>
    );
  });

  const reduced = () => {
    if (page < 2) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
    setCateRender(categories.slice(start, end));
    //   renderArticleManage()
  };
  const increase = () => {
    if (page >= categories.length / 3) {
      setPage(1);
      console.log(page);
    } else {
      setPage(page + 1);
      console.log(page);
    }
    setCateRender(categories.slice(start, end));

    // renderArticleManage()
  };

  return (
    <div className="contentadmin">
      <div id="box">
        <div className="box-panel">
          <div className="header_search boxAdmin">
            <div className="header_search-ip">
              <input
                onChange={listCateSearch}
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
                <th>name categories </th>
              </tr>
            </thead>
            <tbody>{renderCategories}</tbody>
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
