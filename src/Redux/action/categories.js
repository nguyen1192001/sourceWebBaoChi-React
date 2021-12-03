import { ActionTypes } from "../containt/action-types"

export const getCategories = (Catergorie)=>{
    return{
        type:ActionTypes.GET_CATEGORIES,
        payload:Catergorie
    }
}