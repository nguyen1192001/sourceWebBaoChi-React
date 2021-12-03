import { ActionTypes } from "../containt/action-types";
const initialsState = {
    isChangStateHome: true,
    isChangStateNew: false,
    isChangStateModelAcc: false,
    isChangStateModelMenu: false,
    isChangeStateAuth: false,
    isChangeStateCreatNew: false,
    isChangeStateAdmin: false,
    isChangeStateUser: true,
    isChangeStateAdminArticles: false,
    isChangeStateAdminAccounts: false,
    isChangStateHomeToTopic: false,
    isChangStateIntroduce:false,
    isChangStateModelMissPass:false,
    isChangStateModelChangePass:false

}
export const openCloseCPNReducer = (state = initialsState, { type, payload }) => {
    switch (type) {
        case ActionTypes.CHANGE_STATE_HOME:
            return { ...state, isChangStateHome: !state.isChangStateHome }
        case ActionTypes.CHANGE_STATE_NEWS:
            return { ...state, isChangStateNew: !state.isChangStateNew }
        case ActionTypes.CHANGE_STATE_MODELACCOUNT:
            return { ...state, isChangStateModelAcc: !state.isChangStateModelAcc }
        case ActionTypes.CHANGE_STATE_AUTHENTICATOR:
            return { ...state, isChangeStateAuth: !state.isChangeStateAuth }
        case ActionTypes.CHANGE_STATE_CREATENEW:
            return { ...state, isChangeStateCreatNew: !state.isChangeStateCreatNew }
        case ActionTypes.CHANGE_STATE_ADMIN:
            return { ...state, isChangeStateAdmin: !state.isChangeStateAdmin }
        case ActionTypes.CHANGE_STATE_USERS:
            return { ...state, isChangeStateUser: !state.isChangeStateUser }
        case ActionTypes.CHANGE_STATE_ADMIN_ARTICLES:
            return { ...state, isChangeStateAdminArticles: !state.isChangeStateAdminArticles }
        case ActionTypes.CHANGE_STATE_ADMIN_ACCOUNTS:
            return { ...state, isChangeStateAdminAccounts: !state.isChangeStateAdminAccounts }
        case ActionTypes.CHANGE_STATE_MODEL_MENU:
            return { ...state, isChangStateModelMenu: !state.isChangStateModelMenu }
        case ActionTypes.CHANGE_STATE_HOME_TO_TOPIC:
            return { ...state, isChangStateHomeToTopic: !state.isChangStateHomeToTopic }
            case ActionTypes.CHANGE_STATE_INTRODUCE:
                return { ...state, isChangStateIntroduce: !state.isChangStateIntroduce }
                case ActionTypes.CHANGE_STATE_MODEL_MISS_PASS:
                    return { ...state, isChangStateModelMissPass: !state.isChangStateModelMissPass }
                    case ActionTypes.CHANGE_STATE_MODEL_CHANGE_PASS:
                        return { ...state, isChangStateModelChangePass: !state.isChangStateModelChangePass }
        default:
            return state
    }
}