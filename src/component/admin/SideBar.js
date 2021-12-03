import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStateaAdminAccount,
  changeStateaAdminArticles,
  changeStateaAdminCategories,
} from "../../Redux/action/closeOpenComponet";

function SideBar() {
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

  const changeStateArtices = () => {
    dispatch(changeStateaAdminAccount(false));
    dispatch(changeStateaAdminCategories(false));
    dispatch(changeStateaAdminArticles(true));
  };

  const changeStateAccount = () => {
    dispatch(changeStateaAdminArticles(false));
    dispatch(changeStateaAdminCategories(false));
    dispatch(changeStateaAdminAccount(true));
  };
  const changeStateCategories = () => {
    dispatch(changeStateaAdminAccount(false));
    dispatch(changeStateaAdminArticles(false));
    dispatch(changeStateaAdminCategories(true));
  };

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
      </ul>
    </div>
  );
}

export default SideBar;
