import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateHome } from "../../Redux/action/closeOpenComponet";
import AccountManage from "./AccountManage";
import ArticlesManage from "./ArticlesManage";
import CategoriesManage from "./CategoriesManage";
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

  return (
    <div id="container">
      <HeaderAdmin />
      <SideBar />
      {showFormArticlManage()}
      {showFormAccountManage()}
      {showFormCategories()}
    </div>
  );
}

export default Admin;
