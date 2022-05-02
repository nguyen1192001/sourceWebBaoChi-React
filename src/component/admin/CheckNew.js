import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import { Api } from '../Api';
import { removeArticle } from '../../Redux/action/articles';
import { changeStateaAdminArticles, changeStateCheckNew } from "../../Redux/action/closeOpenComponet";

const qs = require('qs')

function NewFromTextED() {
    const dispatch = useDispatch()
    const news = useSelector((state) => state.user.article);
    console.log(">>>>>.... articles", news)

    useEffect(() => {
        document.querySelector(".article_content").innerHTML = news.content
    }, [news])
    const deleteArticles = () => {
        axios.delete(Api().articlesfromtexted + "/" + news._id)
        .then(() =>{
            alert("delete success!!!")
            dispatch(removeArticle(news._id))
            dispatch(changeStateCheckNew())
            dispatch(changeStateaAdminArticles())
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const postArticles = () => {
        let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      
          let changeCheck = qs.stringify({check:0})
        axios.post(Api().articlesfromtexted + "/" + news._id,changeCheck,config)
        .then((item) => {
            console.log("update succcccccccsessss")
            console.log(">>>>.....",item)
            alert("update item success")
           
            dispatch(changeStateCheckNew())
            dispatch(changeStateaAdminArticles())
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return (
        <div className="my-container">
            <div className="article_topic">
                <span>{news.title}</span>
            </div>
            <div className="article_time">
                <span>{news.create_time}</span>
            </div>
            <div className="article_content">

            </div>
            <div className="groupBtn">
                <button className="submit-jounalist" onClick={deleteArticles}>DELETE</button>
                <button className="submit-jounalist" onClick={postArticles}>POST</button>
            </div>

        </div>


    );
}

export default NewFromTextED;
