import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccount, removeAccount } from '../../Redux/action/admin';
import { Api } from '../Api';

const qs = require('qs')

function AccountItem(props) {
    const dispatch = useDispatch()

    const fetchListUsers = async () => {
        const response = await axios.get(Api().user)
        dispatch(getListAccount(response.data))
    }
  

    const [stateCbb,setStateCombobox]=useState(false)
    const [changeUser,setSelfDUser] = useState("")

    

    const accounts = useSelector((state) => state.admin.accounts)
    const deleteAccount =  (idUser) => {
        
        axios.delete(Api().user + "/" +idUser)
        .then(() => {
            console.log("delete succcccccccsessss")
            dispatch(removeAccount(idUser))
            alert("delete item success")
          })
          .catch((err) => {
            console.log(err)
          })
    }
    useEffect(() => {
        fetchListUsers()
        console.log("render userfect statecbb")
    }, [stateCbb])
    const updateAccount = (id) =>{
        const userChange = accounts.find(item => item.user_id === id)
        userChange.sefl_des = changeUser
       
        let config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
       
        let user = qs.stringify({user_id: userChange.user_id, usename: userChange.usename, email: userChange.email, password: userChange.password, full_name: userChange.full_name,avatar:userChange.avatar,sefl_des:userChange.sefl_des})
      
        axios.put(Api().user + "/" + id,user,config)
        .then(() => {
            console.log("update succcccccccsessss")
            alert("update item success")
            setStateCombobox(false)
          })
          .catch((err) => {
            console.log(err)
          })
        
    }
    

    return(
        <tr>
            {console.log("rerender account item", props.item.sefl_des)}
        <td>{props.item.email}</td>
        <td>{props.item.full_name}</td>
        <td>
            {
                stateCbb === true ? (<div className="journalist_topic adminChangeSelfD">
                <div className="menu">
                    <input list="browsers" name="myBrowser"  onChange={(e) => { setSelfDUser(e.target.value) }} />
                    <datalist id="browsers">
                        <option value="user" />
                        <option value="journalist" />
                        <option value="admin" />
                    </datalist>
                </div>
                <button onClick = {()=>{updateAccount(props.item.user_id)}}>OK</button>
            </div>) : (props.item.sefl_des)
            }
        </td>
       
        <td className="adminEdit" onClick = {()=>{deleteAccount(props.item.user_id)}}>DELETE</td>
        <td className="adminEdit"  onClick = {()=>{setStateCombobox(!stateCbb)}}>UPDATE</td>
    </tr>
    )

}

export default AccountItem