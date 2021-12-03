import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListAccount } from '../Redux/action/admin';

import { changeStateAuthenticator, changeStateCreatNew, changeStateHome, changeStateModelMissPaass } from '../Redux/action/closeOpenComponet';
import { setUserSession } from '../Utils/Common';

import { Api } from './Api';

import MissPassMode from './MissPassMode';


const qs = require('qs')

function Authenticator() {

  let history = useHistory()

  const dispatch = useDispatch()
  const ChangeStateAuth = () => {
    dispatch(changeStateAuthenticator())
  }

  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [usename, setUserName] = useState("")
  const [full_name, setFullName] = useState("")
  const [avatar, setAvartar] = useState("")

  const [emailLogin, setEmailLogin] = useState("")
  const [passLogin, setPassLogin] = useState("")
  const stateModelMissPass = useSelector(state => state.opencloseCPN.isChangStateModelMissPass)

  const resertInput = () => {
    setEmail("")
    setPass("")
    setUserName("")
    setFullName("")
    setAvartar("")
    setEmailLogin("")
    setPassLogin("")
  }

  const register = async () => {
    const response = await axios.get(Api().user)


    const itemExitMail = response.data.find(item => item.email == email)


    if (itemExitMail) {
      alert("has mail in account ")
    }
    else {
      const sefl_des = "user"
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      let user = qs.stringify({ email, password, usename, full_name, avatar, sefl_des })
      axios.post(Api().user, user, config)
        .then(() => {
          console.log("add succcccccccsessss")
          resertInput()
          alert("add news success")
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }
  const login = async () => {
    const response = await axios.get(Api().user)
    console.log("responce login", response.data)
    dispatch(getListAccount(response.data))
    const itemExitMail = response.data.find(item => item.email === emailLogin)
    if (itemExitMail) {
      if (itemExitMail.password === passLogin) {
        setUserSession(true, { user: itemExitMail })
        if (itemExitMail.sefl_des == "user") {
          dispatch(changeStateAuthenticator())
          dispatch(changeStateHome())
        }
        else if (itemExitMail.sefl_des == "journalist") {
          dispatch(changeStateAuthenticator())
          dispatch(changeStateCreatNew())
          dispatch(changeStateHome())
        }
        else if (itemExitMail.sefl_des == "admin") {

          history.push("/dmin")
          return;

        }

      } else {
        alert("pass wrong")
      }
    } else {
      alert("not exit account")
    }
  }

  const clickMissPass = () => {
    dispatch(changeStateModelMissPaass())
  }

  const showFormMissPass = () => {
    if (stateModelMissPass) {
      return <MissPassMode />
    }
  }


  return (
    <div className="cover">
      <div className="cover_box">
        <div className="cover_box_close" onClick={ChangeStateAuth}>
          <i className="bx bxs-x-circle" />
        </div>
        <div className="cover_headerBox">
          <div className="cover_headerBox-left">
            <span>Login</span>
          </div>

          <div className="cover_headerBox-right">
            <span>Register</span>
          </div>
        </div>
        <div className="cover_contentBox">
          <div className="cover_contentBox-left">
            <div className="contentBox-title">
              <p>Đặng nhập với email</p>
            </div>
            <div className="contentBox-input">
              <input type="email" name="User_Email" placeholder="email" onChange={(e) => { setEmailLogin(e.target.value) }} />
            </div>
            <div className="contentBox-input">
              <input type="password" placeholder="password" onChange={(e) => { setPassLogin(e.target.value) }} />
            </div>
            <div className="missPassword" onClick={clickMissPass}>
              <span>Quên Mật Khẩu</span>
            </div>
            <div className="contentBox-btn" onClick={login}>
              <button>Login</button>
            </div>
          </div>
          <div className="cover_contentBox-right">
            <div className="contentBox-title">
              <p>Đặng ký với </p>
            </div>
            <div className="contentBox-reigster">
              <div className="contentBox-input">
                <input type="email" placeholder="email" onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className="contentBox-input">
                <input type="password" placeholder="pass" onChange={(e) => { setPass(e.target.value) }} />
              </div>
              <div className="contentBox-input">
                <input type="text" placeholder="user name" onChange={(e) => { setUserName(e.target.value) }} />
              </div>
              <div className="contentBox-input">
                <input type="text" placeholder="full name" onChange={(e) => { setFullName(e.target.value) }} />
              </div>
              <div className="contentBox-input">
                <input type="text" placeholder="image" onChange={(e) => { setAvartar(e.target.value) }} />
              </div>
              <div className="contentBox-btn" onClick={register}>
                <button>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFormMissPass()}
    </div>
  );
}

export default Authenticator