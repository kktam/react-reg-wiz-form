import { Immutable } from 'react';
import { GET_VALUE, SET_KEY_VALUE } from './globalCacheAction'

const initialState = {
}

const globalCacheReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEY_VALUE:
            var userKey = action.data.key;
            var userValue = action.data.value;

            return Object.assign({}, state, {
                userKey: userValue
            }
            );
        default:
            return state
    }
}

const globalCacheReducer2 = (state = Immutable.Map(), action) => {
    switch (action.type) {
        case SET_KEY_VALUE:
            return state.set(
                action.data.key,
                action.data.value
            );
        default:
            return state;
    }
}
  
export default globalCacheReducer;