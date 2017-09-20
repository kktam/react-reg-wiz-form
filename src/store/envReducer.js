import { EnvOptions, SET_ENV } from './envAction'

const initialState = {
    env: EnvOptions.DEVELOPMENT,
}

export default function appEnv(state = initialState, action) {
    switch (action.type) {
        case SET_ENV:
          return Object.assign({}, state, {
            env: action.text
          })
        default:
          return state
    }
}