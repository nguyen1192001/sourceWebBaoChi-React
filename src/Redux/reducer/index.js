import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { journalistReducer } from "./journalistReducer";
import { openCloseCPNReducer } from "./openCloseCPNReducer";
import { userReducer } from "./userReducer";
import { categoriesReducer } from "./categoriesReducer";

const reducers = combineReducers({
  opencloseCPN: openCloseCPNReducer,
  journalist: journalistReducer,
  user: userReducer,
  admin: adminReducer,
  cate: categoriesReducer,
});
export default reducers;
