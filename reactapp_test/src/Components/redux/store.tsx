import {EventReducer} from "./reducers";
import {createStore,combineReducers} from "redux";

const reducers = combineReducers({
    EventReducer
});

export const store = createStore(reducers);

export type rootstate = ReturnType<typeof store.getState>


