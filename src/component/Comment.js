import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAccount } from "../Redux/action/admin";
import { getListComment, pushCommentInList } from "../Redux/action/articles";
import { getUser } from "../Utils/Common";
import { Api } from "./Api";

function Comment(props) {
  const news = useSelector((state) => state.user.article);
 

  const dispatch = useDispatch();
  const User = getUser();

  const fetchListUsers = async () => {
    const response = await axios.get(Api().user);
    dispatch(getListAccount(response.data));
  };
  const fetchListComement = async () => {
    console.log("props",props.item)
    console.log("new",news)
    if(news.articleId){
      const response =  await axios.get(Api().comment,{params:{userId:User.user.userId , articleId:news.articleId}});
     console.log("response",response)
     dispatch(getListComment(response.data));
    }
  };
  // chỗ này lấy id article xong so sánh rồi đẩy cmt ra

  useEffect(() => {
    fetchListUsers();
    fetchListComement();
  }, [news]);

  const listComment = useSelector((state) => state.user.commnets);

  const usercommnet = useSelector((state) => state.admin.accounts);
  const renderCommentUser = () =>
  listComment && listComment.map((item) => {
      const userComment = usercommnet.filter(US => {
        return US.userId === item.userId
      })
      console.log("userComment after filter",userComment)
          return (
            
            <li className="item_comment">
              <div className="header_account-logo">
                {User ? (
                  <img src={userComment[0]?.avatar} alt="logoAvatar" />
                ) : (
                  ""
                )}
              </div>

              <div className="user_comment">
                <span>{User ? item.cmt_content : null}</span>
              </div>
            </li>
          );
        })
     

  const [inputComment, setComment] = useState("");

  const clickCommet = () => {
    if (User === null) {
      alert("bạn cần đăng nhập để có thể bình luận !!!");
    } else {
      const user_Id = User && User.user.userId;

      const article_Id = props.item.articleId;
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
      let dataCommentt = {
        user_Id,article_Id,cmt_Content,create_Time
      }
      axios
        .post(Api().comment,dataCommentt)
        .then((result) => {
          console.log("add succcccccccsessss", result);
          if (result.data.error) {
            alert("hãy là người văn minh và bình luận văn minh");
          } else {
            dispatch(pushCommentInList(dataCommentt));
            fetchListComement()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log("userrrrrr",User)

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
