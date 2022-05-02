import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAccount, removeAccount } from "../../Redux/action/admin";
import { Api } from "../Api";
import AccountItem from "./AccountItem";

const qs = require("qs");

function AccountManage() {
  const dispatch = useDispatch();

  const fetchListUsers = async () => {
    const response = await axios.get(Api().user);
    dispatch(getListAccount(response.data));
  };
  useEffect(() => {
    fetchListUsers();
  }, []);

  const accounts = useSelector((state) => state.admin.accounts);

  console.log("acount first time", accounts);

  const [page, setPage] = useState(1);

  let perPage = 3;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let newAccounts = [...accounts];
  let [accountRender, setAccountRender] = useState(
    newAccounts.slice(start, end)
  );
  console.log("accountrender", accountRender);
  console.log("account start end", accounts.slice(start, end));

  const listAccountSearch = (e) => {
    let renderList = null;
    let { name, value } = e.target;
    console.log("value", value);
    renderList = accounts.filter((item) => {
      return item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    renderList == null
      ? setAccountRender(accountRender)
      : setAccountRender(renderList);
  };

  const renderAccountManage = accountRender.map((item) => {

    console.log('item account manage',item)
    return (
      <>
        <AccountItem item={item} />
      </>
    );
  });

  const reduced = () => {
    if (page < 2) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
    setAccountRender(accounts.slice(start, end));
  };
  const increase = () => {
    if (page >= accounts.length / 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
    setAccountRender(accounts.slice(start, end));
  };

  return (
    <div className="contentadmin">
      {console.log("rerender")}
      <div id="box">
        <div className="box-panel">
          <div className="header_search boxAdmin">
            <div className="header_search-ip">
              <input
                name="email"
                onChange={listAccountSearch}
                type="text"
                placeholder="Nhập nội dung tìm kiếm"
                defaultValue
              />
            </div>
            <button
              className="header_search-btn boxAdminsearchbtn"
              tabIndex={0}
              type="button"
              aria-label="Button"
            >
              <i className="bx bx-search" />
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>email</th>
                <th>full_name</th>
                <th>sefl_des</th>
              </tr>
            </thead>
            <tbody>{renderAccountManage}</tbody>
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

export default AccountManage;
