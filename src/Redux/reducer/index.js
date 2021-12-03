import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { journalistReducer } from "./journalistReducer";
import { openCloseCPNReducer } from "./openCloseCPNReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    opencloseCPN:openCloseCPNReducer,
    journalist:journalistReducer,
    user:userReducer,
    admin:adminReducer
})
export default reducers