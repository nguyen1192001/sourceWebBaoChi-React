import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateHome } from '../../Redux/action/closeOpenComponet';
import AccountManage from './AccountManage';
import ArticlesManage from './ArticlesManage';
import HeaderAdmin from './HeaderAdmin';
import SideBar from './SideBar';

function Admin() {
    const stateArticleManage = useSelector(state => state.opencloseCPN.isChangeStateAdminArticles)
    const stateAccountManage = useSelector(state => state.opencloseCPN.isChangeStateAdminAccounts)
    
    const showFormArticlManage = () => {
        if(stateArticleManage){
            return <ArticlesManage/>
        }
    }
    const showFormAccountManage = () => {
        if(stateAccountManage){
            return <AccountManage/>
        }
    }

    return (
        <div id="container">
            <HeaderAdmin/>
            <SideBar/>
            {showFormArticlManage()}
            {showFormAccountManage()}
        </div>
    );
}

export default Admin