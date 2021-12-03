import { ActionTypes } from "../containt/action-types";
const initialsState = {
    articles: [],
    article: {},
    artilesToMenu: [],
    commnets: [],
    codeMissPass:{}

}
export const userReducer = (state = initialsState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_LIST_ARTICLES:
            return { ...state, articles: payload }
            case ActionTypes.CODE_MISS_PASSWORD:
                return { ...state, codeMissPass: payload }
        case ActionTypes.GET_LIST_COMMNENT:
            let listComment = state.commnets;
            listComment.push(payload);
            [...state.commnets] = listComment;
            return { ...state }
        case ActionTypes.GET_LIST_ARTICLES_TO_MENU:
            state.artilesToMenu.push(payload);
            return { ...state }
        case ActionTypes.GET_ARTICLES:
            return { ...state, article: payload }
        case ActionTypes.REMOVE_ARTICLE:
            let listArticles = state.articles;
            let index = listArticles.findIndex((item) => {
                return item.article_id === payload;
            })
            if (index !== -1) {
                listArticles.splice(index, 1);
            }
            [...state.articles] = listArticles;

            return { ...state }
        default:
            return state
    }
}