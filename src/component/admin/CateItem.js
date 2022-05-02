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
  let { cate_Name, _id } = props.item;

  const dispatch = useDispatch();

  const listCate = useSelector((item) => item.cate.categories);

  let [cateChange, setCate] = useState("");
  const [sateUpdate, setSateUpdate] = useState(false);

  const deleteCate = (_id) => {
    axios
      .delete(Api().categories + "/" + _id)
      .then(() => {
        dispatch(removeCategories(_id));
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
    const updateCate = listCate.find((item) => item._id === id);
    updateCate.cate_Name = cateChange;
    axios
      .post(Api().categories + "/" + id, updateCate)
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
          cate_Name
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
                  updateCate(_id);
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
          deleteCate(props.item._id);
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
