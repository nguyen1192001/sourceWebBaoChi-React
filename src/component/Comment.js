import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAccount } from "../Redux/action/admin";
import { getListComment, pushCommentInList } from "../Redux/action/articles";
import { getUser } from "../Utils/Common";
import { Api } from "./Api";

const qs = require("qs");

function Comment(props) {
  const dispatch = useDispatch();
  const User = getUser();

  const fetchListUsers = async () => {
    const response = await axios.get(Api().user);
    dispatch(getListAccount(response.data));
  };
  const fetchListComement = async () => {
    const response = await axios.get(Api().commnet);
    dispatch(
      getListComment(response.data)
    );
  };
  // chỗ này lấy id article xong so sánh rồi đẩy cmt ra 
  
  useEffect(() => {
    fetchListUsers();
    fetchListComement();
  }, []);

 
  const listComment = useSelector((state) => state.user.commnets);
  console.log(">>>>>>>list comment",listComment)
  const newListCM = []
  listComment.map((item) => item.article_Id == props.item ? newListCM.push(item):"")
  console.log("new list comment",newListCM)

  const user = useSelector((state) => state.admin.accounts);
  
  const renderCommentUser = () =>
  newListCM.length > 0 ? newListCM.map((item) => {
      const userComment = user.find((itemUs) => itemUs._id == item.user_Id);
      return (
        <li className="item_comment">
          <div className="header_account-logo">
            {userComment ? (
              <img src={userComment.avatar} alt="logoAvatar" />
            ) : (
              ""
            )}
          </div>
          
          <div className="user_comment">
            <span>{userComment ? item.cmt_Content : null}</span>
          </div>
        </li>
      );
    }):null;

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
      const user_Id = User.user._id;
      const article_Id = props.item;
      console.log(">>>>>..articles id",article_Id)
      const cmt_Content = inputComment;
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
      const create_Time = dateTime;

      
      let comment = qs.stringify({
        user_Id,
        article_Id,
        cmt_Content,
        create_Time,
      });


      axios
        .post(Api().commnet, comment, config)
        .then((res,req) => {
          console.log("add succcccccccsessss",res);
          if(res.data.error === true){
            alert("hãy là người văn minh và bình luận văn minh")
          }else{
            let comment = {
              user_Id,
              article_Id,
              cmt_Content,
              create_Time,
            };
            dispatch(pushCommentInList(comment))
          }
          //  comment = JSON.parse(comment)\
        })
        .catch((err) => {
          console.log(err);
        });

    }
  };

  return (
    <div className="article_comment">
      <div className="article_comment_title">
        <span>BÌNH LUẬN</span>
      </div>
      <ul className="list_comment">{renderCommentUser()}</ul>
      <div className="box_article_comment">
        <div className="header_account-logo">
          {getUser() === null ? (
            <div className="header_account-logo">
              <img
                src="https://i.pinimg.com/564x/6b/d6/80/6bd680bf5bac75b36b377e02bdb96fd3.jpg"
                alt="logoAvatar"
              />
            </div>
          ) : (
            <div className="header_account-logo">
              <img src={User.user.avatar} alt="logoAvatar" />
            </div>
          )}
        </div>
        <div className="input_article_comment">
          <textarea
            type="text"
            defaultValue={""}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="button_article_comment" onClick={clickCommet}>
        gửi bình luận
      </button>
    </div>
  );
}

export default Comment;
