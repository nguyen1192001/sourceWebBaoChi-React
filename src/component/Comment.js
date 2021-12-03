import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccount } from '../Redux/action/admin';
import { getListComment } from '../Redux/action/articles';
import { getUser } from '../Utils/Common';
import { Api } from './Api';

const qs = require('qs')

function Comment() {
    const dispatch = useDispatch()
    const User = getUser()

    const fetchListUsers = async () => {
        const response = await axios.get(Api().user)
        dispatch(getListAccount(response.data))
    }

    useEffect(() => {
        fetchListUsers()
    }, [])

    const listComment = useSelector((state) => state.user.commnets)
    const user = useSelector((state) => state.admin.accounts)

    const renderCommentUser = () => listComment.map(item => {
        const userComment = user.find(itemUs => itemUs.user_id == item.user_id)
        return (
            <li className="item_comment">
                <div className="header_account-logo">
                    {userComment ? (<img src={userComment.avatar} alt="logoAvatar" />) : ""}
                </div>
                <div className="user_comment">
                    <span>{item.cmt_cotnent}</span>
                </div>
            </li>
        )
    })

    const [inputComment, setComment] = useState("")

    const clickCommet = () => {
        if (getUser() === null) {
            alert("bạn cần đăng nhập để có thể bình luận !!!")
        } else {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const user_id = User.user_id
            const article_id = listComment[0].article_id
            const cmt_cotnent = inputComment
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            const create_time = dateTime

             dispatch(getListComment({user_id ,article_id,cmt_cotnent,  create_time}));
            let comment = qs.stringify({ user_id, article_id, cmt_cotnent, create_time})

            axios.post(Api().commnet, comment, config)
                .then(() => {
                    console.log("add succcccccccsessss")
                    // alert("add comment success")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }



    return (
        <div className="article_comment">
            <div className="article_comment_title">
                <span>BÌNH LUẬN</span>
            </div>
            <ul className="list_comment">
                {renderCommentUser()}
            </ul>
            <div className="box_article_comment">
                <div className="header_account-logo">
                    {
                        getUser() === null ? (<div className="header_account-logo">
                            <img src="https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=n2xWL5_brgUAX_xR6Jr&_nc_ht=scontent.fsgn5-4.fna&oh=b38f503cc15456be6cefdf0c69967c18&oe=61C96378" alt="logoAvatar" />
                        </div>) : (<div className="header_account-logo">
                            <img src={User.user.avatar} alt="logoAvatar" />
                        </div>)
                    }
                </div>
                <div className="input_article_comment">
                    <textarea type="text" defaultValue={""} onChange={(e) => { setComment(e.target.value) }} />
                </div>
            </div>
            <button className="button_article_comment" onClick={clickCommet}>
                gửi bình luận
            </button>
        </div>
    )

}

export default Comment