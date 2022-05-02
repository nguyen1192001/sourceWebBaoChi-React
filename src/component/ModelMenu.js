import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postListNewToIdMenu, getNew } from '../Redux/action/articles';
import { getCategories } from '../Redux/action/categories';
import { changeStateHome, changeStateHomeToTopic, changeStateModelMenu, changeStateNews } from '../Redux/action/closeOpenComponet';
import { Api } from './Api';


function ModelMenu() {
    const dispatch = useDispatch()
    const fetchCategories = async () => {
        const response = await axios.get(Api().categories)
        dispatch(getCategories(response.data))
    }
   

    useEffect(() => {
        fetchCategories()
       
    }, [])

    const news = useSelector((state) => state.user.articles)
    console.log("model menu new ",news)
   
    const clickItemMenu = (id) => {
        news.forEach(element => {
            if(element.cate_Id == id){
                dispatch(postListNewToIdMenu(element))
            }
        });
        dispatch(changeStateHome())
        dispatch(changeStateHomeToTopic())
        

    }
    const categoties = useSelector((state) => state.journalist.categoties)

    const renderMenu = categoties.map((item) => {
        console.log(">>>>>category",item)
        return (
            <li className="model-menu-item" onClick={() => { clickItemMenu(item._id) }}>
                <a><span>{item.cate_Name ? item.cate_Name : ""}</span></a>
            </li>
        )
    })

    return (
        <div className="model-menu">
            <ul className="model-menu-list">
                {renderMenu}
            </ul>
        </div>
    )
}

export default ModelMenu