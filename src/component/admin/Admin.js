import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateHome } from "../../Redux/action/closeOpenComponet";
import AccountManage from "./AccountManage";
import AnalyticVistitor_Chart from "./AnalyticVistitor_Chart";
import ArticlesManage from "./ArticlesManage";
import CategoriesManage from "./CategoriesManage";
import CheckNew from "./CheckNew";
import HeaderAdmin from "./HeaderAdmin";
import SideBar from "./SideBar";


function Admin() {
  const stateArticleManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminArticles
  );
  const stateAccountManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminAccounts
  );
  const stateCategoriesManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminCategories
  );
  const stateAnalyticsManage = useSelector(
    (state) => state.opencloseCPN.isChangeStateAdminAnalytics
  );
  const stateNewCheckArticle = useSelector(
    (state) => state.opencloseCPN.isChangeStateCheckNew
  );
 

  const showFormArticlManage = () => {
    if (stateArticleManage) {
      return <ArticlesManage />;
    }
  };
  const showFormAccountManage = () => {
    if (stateAccountManage) {
      return <AccountManage />;
    }
  };
  const showFormCategories = () => {
    if (stateCategoriesManage) {
      return <CategoriesManage />;
    }
  };
  const showFromAnalytics = () =>{
    if(stateAnalyticsManage){
      return <AnalyticVistitor_Chart/>
    }
  }

  const showFormNewCheck = () =>{
    if(stateNewCheckArticle){
      return <CheckNew/>
    }
  }

  return (
    <div id="container">
      <HeaderAdmin />
      <SideBar />
      {showFormArticlManage()}
      {showFormAccountManage()}
      {showFormCategories()}
      {showFromAnalytics()}
      {showFormNewCheck()}
    </div>
  );
}

export default Admin;
