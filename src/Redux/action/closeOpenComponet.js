import { ActionTypes } from "../containt/action-types";
export const changeStateHome = () => {
  return {
    type: ActionTypes.CHANGE_STATE_HOME,
  };
};
export const changeStateNews = () => {
  return {
    type: ActionTypes.CHANGE_STATE_NEWS,
  };
};
export const changeStateModelAccount = () => {
  return {
    type: ActionTypes.CHANGE_STATE_MODELACCOUNT,
  };
};
export const changeStateAuthenticator = () => {
  return {
    type: ActionTypes.CHANGE_STATE_AUTHENTICATOR,
  };
};
export const changeStateCreatNew = () => {
  return {
    type: ActionTypes.CHANGE_STATE_CREATENEW,
  };
};
export const changeStateaAdmin = () => {
  return {
    type: ActionTypes.CHANGE_STATE_ADMIN,
  };
};
export const changeStateUser = () => {
  return {
    type: ActionTypes.CHANGE_STATE_USERS,
  };
};
export const changeStateaAdminArticles = (state) => {
  return {
    type: ActionTypes.CHANGE_STATE_ADMIN_ARTICLES,
    payload: state,
  };
};
export const changeStateaAdminAccount = (state) => {
  return {
    type: ActionTypes.CHANGE_STATE_ADMIN_ACCOUNTS,
    payload: state,
  };
};
export const changeStateaAdminCategories = (state) => {
  return {
    type: ActionTypes.CHANGE_STATE_ADMIN_CATEGORIES,
    payload: state,
  };
};
export const changeStateaAdminAnalytics = (state) => {
  return {
    type: ActionTypes.CHANGE_STATE_MODEL_ANALYTICS,
    payload: state,
  };
};
export const changeStateModelMenu = () => {
  return {
    type: ActionTypes.CHANGE_STATE_MODEL_MENU,
  };
};
export const changeStateHomeToTopic = () => {
  return {
    type: ActionTypes.CHANGE_STATE_HOME_TO_TOPIC,
  };
};
export const changeStateIntroduce = () => {
  return {
    type: ActionTypes.CHANGE_STATE_INTRODUCE,
  };
};
export const changeStateModelMissPaass = () => {
  return {
    type: ActionTypes.CHANGE_STATE_MODEL_MISS_PASS,
  };
};
export const changeStateModeChangePass = () => {
  return {
    type: ActionTypes.CHANGE_STATE_MODEL_CHANGE_PASS,
  };
};
export const changeStateCheckNew = () => {
  return {
    type: ActionTypes.CHANGE_STATE_CHECK_NEW,
  };
};

