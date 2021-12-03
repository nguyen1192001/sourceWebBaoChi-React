import { ActionTypes } from "../containt/action-types";

export const getCategories = (Catergorie) => {
  return {
    type: ActionTypes.GET_CATEGORIES,
    payload: Catergorie,
  };
};
export const removeCategories = (idCate) => {
  return {
    type: ActionTypes.REMOVE_CATEGORISE,
    payload: idCate,
  };
};
export const updateCategories = (cateUpdate) => {
  return {
    type: ActionTypes.UPDATE_CATEGORIES,
    payload: cateUpdate,
  };
};
