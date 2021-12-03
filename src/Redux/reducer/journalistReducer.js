import { ActionTypes } from "../containt/action-types";
const initialsState = {
    categoties:[]
}
export const journalistReducer = (state = initialsState,{type,payload})=>{
    switch (type){
        case ActionTypes.GET_CATEGORIES:
            return {...state,categoties:payload}
        default:
            return state
    }
}