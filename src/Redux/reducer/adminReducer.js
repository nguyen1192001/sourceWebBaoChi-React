import { ActionTypes } from "../containt/action-types";
const initialsState = {
    accounts: [],
    analytics:[]
}
export const adminReducer = (state = initialsState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_LIST_ACCOUNT:
            [...state.accounts] = payload;
            return { ...state }
        case ActionTypes.REMOVE_ACCOUNT:
            let listAccounts = state.accounts;
            let index = listAccounts.findIndex((item)=>{
                return item.user_id === payload;  
            })
            if(index !== -1){
                listAccounts.splice(index,1); 
            }
            [...state.accounts] = listAccounts;
            
            return   {...state}
        case ActionTypes.GET_LIST_ANALYTICS:
            [...state.analytics] = payload
            return {...state}
        default:
            return state
    }
}