import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeStateaAdminAccount,
  changeStateaAdminArticles,
  changeStateaAdminCategories,
  changeStateaAdminAnalytics
} from "../../Redux/action/closeOpenComponet";


function SideBar() {
  const history = useHistory()
  const dispatch = useDispatch();
  const stateArticleManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminArticles
  );
  const stateAccountManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminAccounts
  );
  const stateCategoriesManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminCategories
  );
  const stateAnalysticManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminAnalytics
  );


  const changeStateArtices = () => {
    if(stateAccountManage){
      dispatch(changeStateaAdminAccount());
    }
    if(stateCategoriesManage){
     
      dispatch(changeStateaAdminCategories());
    }
    if(stateAnalysticManage){
     
      dispatch(changeStateaAdminAnalytics())
    }
    dispatch(changeStateaAdminArticles(true));
  };

  const changeStateAccount = () => {
    if(stateArticleManage){
      dispatch(changeStateaAdminArticles());
    }
    if(stateCategoriesManage){
     
      dispatch(changeStateaAdminCategories());
    }
    if(stateAnalysticManage){
     
      dispatch(changeStateaAdminAnalytics())
    }
    dispatch(changeStateaAdminAccount(true));
  };
  const changeStateCategories = () => {
    if(stateArticleManage){
      dispatch(changeStateaAdminArticles());
    }
    if(stateAccountManage){
     
      dispatch(changeStateaAdminAccount());
    }
    if(stateAnalysticManage){
     
      dispatch(changeStateaAdminAnalytics())
    }
    dispatch(changeStateaAdminCategories(true));
  };
  const changeStateAnalytics = () =>{
    if(stateArticleManage){
      dispatch(changeStateaAdminArticles());
    }
    if(stateAccountManage){
     
      dispatch(changeStateaAdminAccount());
    }
    if(stateCategoriesManage){
     
      dispatch(changeStateaAdminCategories());
    }
    dispatch(changeStateaAdminAnalytics(true))
  }

  return (
    <div className="sidebar">
      <ul id="nav">
        <li onClick={changeStateArtices}>
          <a>ARTICLES</a>
        </li>
        <li onClick={changeStateAccount}>
          <a>ACCOUNT</a>
        </li>
        <li onClick={changeStateCategories}>
          <a>CATEGORIES</a>
        </li>
        <li onClick={changeStateAnalytics}>
          <a>ANALYTICS</a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
