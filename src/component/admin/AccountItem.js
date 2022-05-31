import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListAccount, removeAccount } from '../../Redux/action/admin';
import { Api } from '../Api';

const qs = require('qs')

function AccountItem(props) {
    console.log(">>>>props",props)
    const dispatch = useDispatch()
    const fetchListUsers = async () => {
        const response = await axios.get(Api().user)
        dispatch(getListAccount(response.data))
    }
    const [stateCbb, setStateCombobox] = useState(false)
    const [changeUser, setSelfDUser] = useState("")


    const accounts = useSelector((state) => state.admin.accounts)
    const deleteAccount = (idUser) => {

        axios.delete(Api().user + "/" + idUser)
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
    const handeChangeRoleUser = (e)=>{
        setSelfDUser(e.target.value)
    }
    const updateAccount = async (id) => {
        try {
           let result =  await axios.put(Api().user,{id,changeUser})
           setStateCombobox(!stateCbb)
            console.log('result',result)
        } catch (error) {
            console.log("error",error)
        }
    }


    return (
        <tr>
            {console.log("rerender account item", props.item.self_des)}
            <td>{props.item.email}</td>
            <td>{props.item.full_name}</td>
            <td>
                {
                    stateCbb === true ? <>
                        <select onChange={handeChangeRoleUser} className="journalist_topic adminChangeSelfD">
                            <option value="user" >user</option>
                            <option value="journalist" >journalist</option>
                            <option value="admin" >admin</option>
                            <option value="receive" >receive</option>
                        </select>
                        <button onClick={() => { updateAccount(props.item.userId) }}>OK</button>
                    </>
                        : (props.item.self_des)
                }
            </td>

            <td className="adminEdit" onClick={() => { deleteAccount(props.item.userId) }}>DELETE</td>
            <td className="adminEdit" onClick={() => { setStateCombobox(!stateCbb) }}>UPDATE</td>
        </tr>
    )

}

export default AccountItem