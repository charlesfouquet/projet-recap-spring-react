import { combineReducers } from "redux";
import UserToUpdateReducer from "./UserToUpdateReducer";

const reducers = combineReducers({
    userToUpdate: UserToUpdateReducer
})

export default reducers;