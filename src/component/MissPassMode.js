import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import emailJs from 'emailjs-com'
import { changeStateModelMissPaass } from '../Redux/action/closeOpenComponet';
import { getCodeMissPass } from '../Redux/action/articles';
import axios from 'axios';
import { Api } from './Api';
import { getListAccount } from '../Redux/action/admin';



function MissPassMode() {
  

 

  const accounts = useSelector((state) => state.admin.accounts)

  let email ;

  const handleChane  = (e) =>{
    email = e.target.value;
    console.log("email",email)
  }

  const dispatch = useDispatch()

  const ranDomCode = Math.floor(Math.random() * 10000) + 1000;

  dispatch(getCodeMissPass(ranDomCode))
  const codeSendToUser = useSelector(state => state.user.codeMissPass)
  let inputUser, inputNewPass

  const clickMissPass = (e) => {
    e.preventDefault()

    console.log("ramdomcode>>>>>>>>", ranDomCode)
    emailJs.sendForm("service_odglqcm",
      "template_ouz0s9g",
      e.target,
      "user_ciqR7ayuW40VmlbzMx4vp").then(res => {
        inputUser = prompt("Nhập mã code được gửi ở email");
        if (codeSendToUser == inputUser) {
          dispatch(changeStateModelMissPaass())
          inputNewPass = prompt("Nhập mật khẩu mà bạn muốn thay đổi");

          const itemChange = accounts.find(item => item.email == email)
          itemChange.password = inputNewPass

          axios.put(Api().user + "/" + itemChange.user_id,itemChange)
          .then(res => {
            alert("cập nhật thành công")
            console.log(res)
          }).catch(err => {
            console.log(err)
          })


        } else {
          alert("sai mã code !!!!!!")
        }


        console.log(res)
      }).catch(err => console.log(err));
  }


  return (

    <div className="cover">

      <form className="cover_box_misspass" onSubmit={clickMissPass}>
        <span>quên mật khẩu</span>
        <div className="contentBox-input">
          <input className="misspass" id="email" type="email" name="User_Email" placeholder="email"   onChange={handleChane} />
          <input className="misspass-hiden" type="text" name="ranDomCode" defaultValue={ranDomCode} placeholder="code" />
        </div>
        <button className="misspass-btn">gửi</button>
      </form>


    </div>
  );
}

export default MissPassMode