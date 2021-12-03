import { ActionTypes } from "../containt/action-types"

export const getListNew = (articles)=>{
    return{
        type:ActionTypes.GET_LIST_ARTICLES,
        payload:articles
    }
}
export const getCodeMissPass = (code)=>{
    return{
        type:ActionTypes.CODE_MISS_PASSWORD,
        payload:code
    }
}
export const getListComment = (comments)=>{
    return{
        type:ActionTypes.GET_LIST_COMMNENT,
        payload:comments
    }
}

export const postListNewToIdMenu = (articles)=>{
    return{
        type:ActionTypes.GET_LIST_ARTICLES_TO_MENU,
        payload:articles
    }
}
export const getNew = (article)=>{
    return{
        type:ActionTypes.GET_ARTICLES,
        payload:article
    }
}
export const removeArticle = (idarticle)=>{
    return{
        type:ActionTypes.REMOVE_ARTICLE,
        payload:idarticle
    }
}

