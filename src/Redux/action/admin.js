import { ActionTypes } from "../containt/action-types"

export const getListAccount = (accounts)=>{
    return{
        type:ActionTypes.GET_LIST_ACCOUNT,
        payload:accounts
    }
}

export const getListAnalytics = (analytic)=>{
    return {
        type:ActionTypes.GET_LIST_ANALYTICS,
        payload:analytic
    }
}
export const removeAccount = (idAccount)=>{
    return{
        type:ActionTypes.REMOVE_ACCOUNT,
        payload:idAccount
    }
}

