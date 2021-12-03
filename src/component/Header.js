import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateHome, changeStateModelAccount, changeStateNews } from '../Redux/action/closeOpenComponet';
import ModelAccount from './ModelAccount';
import { getUser } from '../Utils/Common';
import axios from 'axios';
import { Api } from './Api';
import { getListNew, getNew } from '../Redux/action/articles';
import { useHistory } from 'react-router-dom';

function Header() {


  const User = getUser()
  const newsList = useSelector((state) => state.user.articles)

  const dispatch = useDispatch()
  const stateModelAcc = useSelector(state => state.opencloseCPN.isChangStateModelAcc)
  const ChangeStateModelAcc = () => {
    dispatch(changeStateModelAccount())
  }
  const rederModelAcount = () => {
    if (stateModelAcc) {
      return <ModelAccount />
    }
  }
  
  const [news, setListNew] = useState(newsList)

  const listAccountSearch = (e) => {
    let renderList = [];
    let { value } = e.target

    renderList = newsList.filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    })

    value.length == 0 ? setListNew(newsList) : setListNew(renderList)
  }
  const fetchNew = async (idNew) => {
    const response = await axios.get(Api().articles + "/" + idNew)
    dispatch(getNew(response.data))
  }
  const selectNew = (id) => {
    
    fetchNew(id)
    dispatch(changeStateHome())
    dispatch(changeStateNews())
  }

  const renderSearchInput = news.map((item, index) => {
    if (index < 10) {
      return (
        <li >
          <span onClick={() => { selectNew(item.article_id) }}>
          {item.title}

          </span>
        </li>
      )
    }
  })



  return (
    <div className="header">
      <div className="header_logo">
        <img src="https://gudlogo.com/wp-content/uploads/2019/05/logo-con-bao-dom-37-1030x773.jpg" alt="logobao" />
      </div>
      <div className="header_search">
        <div className="header_search-ip">
          <input onChange={listAccountSearch} type="text" placeholder="Nhập nội dung tìm kiếm" />
          <div className="search__news">
            <ul>
              {renderSearchInput}
            </ul>
          </div>
        </div>
        {/* <button className="header_search-btn">
          <i className="bx bx-search" />
        </button> */}
      </div>
      <div className="header_account" onClick={ChangeStateModelAcc}>

        {
          getUser() === null ? (<div className="header_account-logo">
            <img src="https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=n2xWL5_brgUAX_xR6Jr&_nc_ht=scontent.fsgn5-4.fna&oh=b38f503cc15456be6cefdf0c69967c18&oe=61C96378" alt="logoAvatar" />
          </div>) : (<div className="header_account-logo">
            <img src={User.user.avatar} alt="logoAvatar" />
          </div>)
        }

        {
          getUser() === null ? (<div className="header_account-userName">
            <h6>Login</h6></div>) : (<div className="header_account-userName">
              <h6>{User.user.full_name}</h6>
            </div>)
        }

        {rederModelAcount()}
      </div>
    </div>
  );
}

export default Header