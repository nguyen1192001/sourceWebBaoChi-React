import React, { useState } from "react";
import { useQuill } from "react-quilljs";
import axios from 'axios'
// or const { useQuill } = require('react-quilljs');
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { useSelector } from "react-redux";
import { getUser } from "../../Utils/Common";
import { Api } from "../Api";
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const qs = require('qs')
function TextEditor() {
    const [cateName, setCateName] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")

    const refreshStateArticle  = () =>{
        setCateName("")
        setTitle("")
        setImage("")
        document.querySelector(".ql-editor").innerHTML = "" 
    }
    const user = getUser()
    const categoties = useSelector((state) => state.journalist.categoties)
    const renderCategories = categoties.map((item) => {
        return (
            <option value={item.cate_Name} />
        )
    })

    const { quill, quillRef } = useQuill();
    const onchange = () => {
        let content = document.querySelector(".ql-editor").innerHTML
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const create_time = dateTime

        const itemcate = categoties.find(item => item.cate_Name === cateName)

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const user_Id = user.user._id
        const cate_Id = itemcate._id
        const check = 1

        let article = qs.stringify({ check,title,image,content, create_time, user_Id, cate_Id })

        axios.post(Api().articlesfromtexted, article, config)
            .then(() => {
                console.log("add succcccccccsessss")
                refreshStateArticle()
                 alert("add news success")
            })
            .catch((err) => {
                console.log("hông add được bé ơi", err)
            })
        console.log(article)
    }

    console.log(quill); // undefined > Quill Object
    console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

    return (
        <>
            <h2 className="jounalist-title">Create some Articles</h2>

            <div className="menu">
                <input list="browsers" name="myBrowser" value = {cateName} onChange={(e) => { setCateName(e.target.value) }} />
                <datalist id="browsers">
                    {
                        renderCategories
                    }
                </datalist>
            </div>
            <div className="journalist_title">
                <input type="text" defaultValue="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="journalist_title">
                <input type="text" defaultValue="images" value={image} onChange={(e) => { setImage(e.target.value) }} />
            </div>
            <div className="journalist">
                <div ref={quillRef} />
            </div>
            <button className="submit-jounalist" onClick={onchange} >Submit</button>
        </>

    );
}


export default TextEditor
