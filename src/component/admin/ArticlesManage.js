import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListNew, getNew, removeArticle } from '../../Redux/action/articles';
import { useState } from 'react';
import axios from 'axios';
import { Api } from '../Api';
import { useHistory } from 'react-router-dom';
import { changeStateaAdminAnalytics, changeStateaAdminArticles, changeStateCheckNew } from '../../Redux/action/closeOpenComponet';


function ArticlesManage() {
    const history = useHistory()
    let [page , setPage] = useState(1)

    const dispatch = useDispatch()
    const news = useSelector((state) => state.user.articles)
    console.log(">>>>.new length",news)
    const removeArticleManage = (id) => {
        axios.delete(Api().articlesfromtexted + "/" + id)
        .then(() =>{
            alert("delete success!!!")
            dispatch(removeArticle(news.articleId))
        })
        .catch((err)=>{
            console.log(err)
        })
        // alert("jbfjd")
    }


    const checkNew = (id) => {
        history.push("/dmin/checkNew/"+id)
        
    }

    const fetchListNew = async () => {
        // const response = await axios.get(Api().articles)
        const response = await axios.get(Api().articlesfromtexted);
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

   
    console.log(">>>>>.news",news)
    const renderArticleManage = newRender.map((item) => {
        console.log("item",item)
        
        return (
            <tr>
                <td>{item.title}</td>
                <td>{item.userId}</td>
                <td>{item.cateId}</td>
                <td>{item.checknew}</td>
                {item.checknew == 1 ? (<th className="adminEdit" onClick={() => { checkNew(item.articleId) }}>CHECK</th>): ""}
                {item.checknew == 0 ? (<th className="adminEdit Delete" onClick={() => { removeArticleManage(item.articleId) }}>DELETE</th>) : ""}

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
                                <th>check</th>
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