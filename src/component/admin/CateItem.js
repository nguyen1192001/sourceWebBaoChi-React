import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAccount, removeAccount } from "../../Redux/action/admin";
import {
  getCategories,
  removeCategories,
  updateCategories,
} from "../../Redux/action/categories";
import { Api } from "../Api";

export default function CateItem(props) {
  let { cate_name, cate_id } = props.item;

  const dispatch = useDispatch();

  const listCate = useSelector((item) => item.cate.categories);

  let [cateChange, setCate] = useState("");
  const [sateUpdate, setSateUpdate] = useState(false);

  const deleteCate = (idCate) => {
    axios
      .delete(Api().categories + "/" + idCate)
      .then(() => {
        dispatch(removeCategories(idCate));
        alert("delete item success");
      })
      .catch((err) => {
        console.log(err);
        alert("không thể xóa thể loại đang được sử dụng");
      });
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setCate(value);
  };

  const updateCate = (id) => {
    const updateCate = listCate.find((item) => item.cate_id === id);
    updateCate.cate_name = cateChange;
    axios
      .put(Api().categories + "/" + id, updateCate)
      .then(() => {
        setSateUpdate(false);
        dispatch(updateCategories(updateCate));
        alert("cập nhật thể loại thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr>
      <td>
        {!sateUpdate ? (
          cate_name
        ) : (
          <>
            <input
              onChange={handleChange}
              placeholder={"update : " + props.item.cate_name}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 5,
              }}
            >
              <button
                className="btn_update"
                onClick={() => {
                  updateCate(cate_id);
                }}
              >
                cập nhật
              </button>
            </div>
          </>
        )}
      </td>

      <td
        className="adminEdit"
        onClick={() => {
          deleteCate(props.item.cate_id);
        }}
      >
        DELETE
      </td>
      <td
        className="adminEdit"
        onClick={() => {
          setSateUpdate(!sateUpdate);
        }}
      >
        UPDATE
      </td>
    </tr>
  );
}
