import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAccount } from "../Redux/action/admin";
import { getListComment } from "../Redux/action/articles";
import { getUser } from "../Utils/Common";
import { Api } from "./Api";
const qs = require("qs");

export default function NewComment(props) {
  const dispatch = useDispatch();
  const User = getUser();

  const fetchListUsers = async () => {
    const response = await axios.get(Api().user);
    dispatch(getListAccount(response.data));
  };

  const listComment = useSelector((state) => state.user.commnets);
  const users = useSelector((state) => state.admin.accounts);

  console.log("list comment", listComment);
  console.log("list user", users);

  let [listMixComment, setListMixComment] = useState([]);

  const mixCommentUser = () => {
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < listComment.length; j++) {
        if (users[i].user_id == listComment[j].user_id) {
          let mixComment = { ...users[i], ...listComment[j] };
          console.log("in mix comment", users[i].user_id);
          listMixComment.push(mixComment);
          console.log("list mix comment", listMixComment);
        }
      }
    }
  };

  useEffect(() => {
    mixCommentUser();
  });

  useEffect(() => {
    fetchListUsers();
  }, []);
  const renderCommentUser = listMixComment.map((item) => {
    return (
      <>
        <div className="comment__old flex">
          <div className="comment__old__avartar">
            <img src={item.avatar} alt />
          </div>
          <div className="comment__old__content">
            <div className="comment__old__detail">
              <span>{item.usename}</span>
              <span>{item.create_time}</span>
            </div>
            <span className="text_comment">{item.cmt_cotnent}</span>
          </div>
        </div>
      </>
    );
  });

  const [inputComment, setComment] = useState("");

  const clickCommet = () => {
    if (getUser() === null) {
      alert("bạn cần đăng nhập để có thể bình luận !!!");
    } else {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const user_id = User.user.user_id;
      const article_id = props.item;
      const cmt_cotnent = inputComment;
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      const create_time = dateTime;

      dispatch(
        getListComment({ user_id, article_id, cmt_cotnent, create_time })
      );
      let comment = qs.stringify({
        user_id,
        article_id,
        cmt_cotnent,
        create_time,
      });

      axios
        .post(Api().commnet, comment, config)
        .then(() => {
          console.log("add succcccccccsessss");
          // alert("add comment success")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="comment">
      <h3>BÌNH LUẬN</h3>
      {console.log(listMixComment, "fffffff")}
      <div className="comment__user flex">
        <div className="comment__user__avartar">
          {getUser() === null ? (
            <img
              src="./image/z2937267975608_6cf24cf7ee2240c7c4bb4325ba217a8a.jpg"
              alt
            />
          ) : (
            <img src={User.user.avatar} alt="logoAvatar" />
          )}
        </div>
        <div className="comment__user__text">
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            rows={4}
            cols={50}
            placeholder="ý kiến của bạn "
            defaultValue={""}
          />
        </div>
      </div>
      <div className="flex btn_send">
        <button onClick={clickCommet}>gửi bình luận</button>
      </div>
      <div className="comment__number">
        <p>{listMixComment.length}</p>
      </div>
      {renderCommentUser}
    </div>
  );
}
