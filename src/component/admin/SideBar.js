import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateaAdminAccount, changeStateaAdminArticles } from '../../Redux/action/closeOpenComponet';

function SideBar() {
    const dispatch = useDispatch()
    const stateArticleManage = useSelector(state => state.opencloseCPN.isChangeStateAdminArticles)
    const stateAccountManage = useSelector(state => state.opencloseCPN.isChangeStateAdminAccounts)

    const changeStateArtices = ()=>{
        if(stateAccountManage){
            dispatch(changeStateaAdminAccount())
        }
        dispatch(changeStateaAdminArticles())
    }
    
    const changeStateAccount = ()=>{
        if(stateArticleManage){
            dispatch(changeStateaAdminArticles())
        }
        dispatch(changeStateaAdminAccount())
    }

    return (
        <div className="sidebar">
            <ul id="nav">
                <li onClick = {changeStateArtices}>
                    <a>ARTICLES</a>
                </li>
                <li  onClick = {changeStateAccount}>
                    <a>ACCOUNT</a>
                </li>
            </ul>
        </div>
    );
}

export default SideBar