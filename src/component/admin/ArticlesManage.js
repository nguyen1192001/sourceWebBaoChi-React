import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListNew, removeArticle } from '../../Redux/action/articles';
import { useState } from 'react';
import axios from 'axios';
import { Api } from '../Api';

function ArticlesManage() {
    let [page , setPage] = useState(1)

    const dispatch = useDispatch()
    const news = useSelector((state) => state.user.articles)
    console.log(news.length)
    const removeArticleManage = (id) => {
        console.log(">>>>>>>>>", id)
        dispatch(removeArticle(id))
    }
    const fetchListNew = async () => {
        const response = await axios.get(Api().articles)
        dispatch(getListNew(response.data))
    }

    useEffect(()=>{
        fetchListNew()
    },[])


    
    // setPage(1)
    let perPage = 3
    let start = (page - 1) * perPage
    let end  = page * perPage

    const [newRender,setNewsRender] = useState(news.slice(start,end))
    const listNewsSearch = (e)=>{
        let renderList = null;
        let {name,value} = e.target
        console.log("value" , value)
        renderList =  news.filter((item)=>{
             return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
         })
         renderList == null ? setNewsRender(newRender): setNewsRender(renderList)
    }


    console.log(" page line 21" ,page)
    const reduced = () => {
      if(page < 2){
          setPage(1)
          console.log("page line 25",page)
      }else{
        console.log( "page line 27",page)
          setPage(page - 1)
          
      }
      setNewsRender(news.slice(start,end))
    //   renderArticleManage()
    }
    const increase = () => {
        if(page >= news.length/3){
            setPage(1)
            console.log(page)

        }else{
            setPage(page + 1)
            console.log(page)
        }
        setNewsRender(news.slice(start,end))
       
        // renderArticleManage()
    }

   

    const renderArticleManage = newRender.map((item) => {
        return (
            <tr>
                <td>{item.title}</td>
                <td>{item.user_id}</td>
                <td>{item.cate_id}</td>
                <th className="adminEdit" onClick={() => { removeArticleManage(item.article_id) }}>DELETE</th>

            </tr>
        )
    })
    return (
        
        <div className="contentadmin">
            {console.log("rereder page >>")}
            <div id="box">
                <div className="box-panel">
                    <div className="header_search boxAdmin">
                        <div className="header_search-ip">
                            <input onChange={listNewsSearch} type="text" placeholder="Nhập nội dung tìm kiếm" defaultValue />
                        </div>
                        <button className="header_search-btn boxAdminsearchbtn" tabIndex={0} type="button" aria-label="Button">
                            <i className="bx bx-search" />
                        </button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>user</th>
                                <th>cate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderArticleManage}
                        </tbody>
                    </table>
                    <div className="demochoichodui">
                        <button onClick={reduced}>Prev</button>
                        <button onClick={increase}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticlesManage