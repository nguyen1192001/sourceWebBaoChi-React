import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeStateaAdmin, changeStateAuthenticator, changeStateCreatNew, changeStateHome, changeStateNews, changeStateUser } from '../Redux/action/closeOpenComponet';
import { getUser, removeUserSession } from '../Utils/Common';


function ModelAccount() {
    const history = useHistory()
    const stateCreateNew = useSelector(state => state.opencloseCPN.isChangeStateCreatNew)
    const stateUse = useSelector(state => state.opencloseCPN.isChangeStateUser)

 
    const dispatch = useDispatch()
    const ChangeStateAuth = ()=>{
        dispatch(changeStateAuthenticator())
        dispatch(changeStateNews())
    }
    const RemoveSesion = () =>{
        if(stateCreateNew){
            dispatch(changeStateCreatNew())
        }
            // dispatch(changeStateaAdmin())
            // dispatch(changeStateHome())
        //   dispatch(changeStateUser())
        history.push("/")
        removeUserSession()
    }

    return (
        < div className="Model-account" >
            <ul className="listAccount">
                {
                    getUser() === null ? (<li className="bm_Ho" onClick={ChangeStateAuth}>
                    <a>
                        <i className="bm_BE bm_Gx"><i className="bx bxl-docker" /></i>
                        <span>Đăng nhập</span>
                    </a>
                </li>) : (<li className="bm_Ho" onClick={RemoveSesion}>
                    <a>
                        <i className="bm_BE bm_Gx"><i className="bx bxl-docker" /></i>
                        <span>Đăng Xuất</span>
                    </a>
                </li>)
                }
                
            </ul>
        </div >
    )
}

export default ModelAccount