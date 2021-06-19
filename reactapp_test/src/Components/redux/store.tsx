import {EventReducer,BookingReducer} from "./reducers";
import {createStore,combineReducers} from "redux";

const reducers = combineReducers({
    EventReducer,
    BookingReducer
});

export const store = createStore(reducers);

export type rootstate = ReturnType<typeof store.getState>


