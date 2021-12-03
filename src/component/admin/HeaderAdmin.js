import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStateModelAccount } from '../../Redux/action/closeOpenComponet';
import { getUser } from '../../Utils/Common';
import ModelAccount from '../ModelAccount';


function HeaderAdmin() {
    const User = getUser()
    console.log(User)

    const dispatch = useDispatch()
    const stateModelAcc = useSelector(state => state.opencloseCPN.isChangStateModelAcc)
    const ChangeStateModelAcc = () => {
        dispatch(changeStateModelAccount())
    }
    const rederModelAcount = () => {
        if (stateModelAcc) {
            return <ModelAccount />
        }
    }


    return (
        <div className="header">
            <div className="header_logo">
              
            </div>
            <div className="header_account" onClick={ChangeStateModelAcc}>

                {
                    getUser() === null ? (<div className="header_account-logo">
                        <img src="https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=n2xWL5_brgUAX_xR6Jr&_nc_ht=scontent.fsgn5-4.fna&oh=b38f503cc15456be6cefdf0c69967c18&oe=61C96378" alt="logoAvatar" />
                    </div>) : (<div className="header_account-logo">
                        <img src={User.user.avatar} alt="logoAvatar" />
                    </div>)
                }


                {
                    getUser() === null ? (<div className="header_account-userName">
                        <h6>Login</h6></div>) : (<div className="header_account-userName">
                            <h6>{User.user.full_name}</h6>
                        </div>)
                }

                {rederModelAcount()}
            </div>
        </div>
    );
}

export default HeaderAdmin