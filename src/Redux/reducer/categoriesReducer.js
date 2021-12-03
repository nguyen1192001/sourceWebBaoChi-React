import { ActionTypes } from "../containt/action-types";
const initialsState = {
  categories: [],
};
export const categoriesReducer = (state = initialsState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CATEGORIES:
      [...state.categories] = payload;
      return { ...state };
    case ActionTypes.REMOVE_CATEGORISE:
      let listCate = state.categories;
      let index = listCate.findIndex((item) => {
        return item.cate_id === payload;
      });
      if (index !== -1) {
        listCate.splice(index, 1);
      }
      [...state.categories] = listCate;
    case ActionTypes.UPDATE_CATEGORIES:
      let listCateUpdate = state.categories;
      let indexUpdate = listCateUpdate.findIndex((item) => {
        return item.cate_id === payload.cate_id;
      });
      if (indexUpdate !== -1) {
        listCateUpdate[indexUpdate] = payload;
      }
      [...state.categories] = listCateUpdate;
      return { ...state };
    default:
      return state;
  }
};
