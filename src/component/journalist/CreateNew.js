import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/action/categories';
import { Api } from '../Api';
import { getUser } from '../../Utils/Common';



const qs = require('qs')
function CreateNew() {
    const dispatch = useDispatch()
    const user = getUser()

    const fetchCategories = async () => {
        const response = await axios.get(Api().categories)
        dispatch(getCategories(response.data))
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const categoties = useSelector((state) => state.journalist.categoties)

    const [cateName, setCateName] = useState("")
    const [title, setTitle] = useState("")
    const [textbody, setTextbody] = useState("")
    const [image, setImage] = useState("")



    const login = () => {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        const create_time = dateTime
       
        const itemcate = categoties.find(item => item.cate_Name === cateName)

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const user_Id = user.user._id
        const cate_Id = itemcate._id

        let article = qs.stringify({ title, textbody, create_time, image, user_Id, cate_Id })

        console.log(">>>>>>>>..",article)

        axios.post(Api().articles, article, config)
            .then(() => {
                
                console.log("add succcccccccsessss")
                alert("add news success")
            
                
            })
            .catch((err) => {
                console.log("hông add được bé ơi",err)
            })
            console.log(article)
    
    }

    console.log("categories>>>>>>>>",categoties)

    const renderCategories = categoties.map((item) => {
        return (
            <option value={item.cate_Name} />
        )
    })
    return (
        <div className="my-container">
            <div className="article_topic">
                <span>Create NEW</span>
            </div>
            <div className="journalist">
                <div className="journalist_topic">
                    <div className="menu">
                        <input list="browsers" name="myBrowser" onChange={(e) => { setCateName(e.target.value) }} />
                        <datalist id="browsers">
                            {
                                renderCategories
                            }
                        </datalist>
                    </div>
                </div>
                <div className="journalist_title">
                    <input type="text" defaultValue="title" onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                {/* <div className="journalist_title sumarry">
                    <input type="text" defaultValue="sumary" onChange={(e) => { setEmail(e.target.value) }} />
                </div> */}
                <div className="journalist_title">
                    <input type="text" defaultValue="images" onChange={(e) => { setImage(e.target.value) }} />
                    
                </div>
                {/* <div className="journalist_title_file">
                    <input type="file" onChange={(e) => { setImage(e.target.value) }} />
                </div> */}

                  

                <div className="journalist_title content">
                    {/* <input type="text" defaultValue="content" onChange={(e) => { setTextbody(e.target.value) }} /> */}
                    <textarea  placeholder="text" onChange={(e) => { setTextbody(e.target.value) }}></textarea>
                </div>
                
                <div className="contentBox-btn">
                    <button onClick={login}>Submit New</button>
                </div>
            </div>
        </div>
    );
}

export default CreateNew