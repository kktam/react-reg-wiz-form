/*
 * action types
 */
export const SET_ENV = 'SET_ENV'
export const GET_ENV = 'GET_ENV'

/*
 * other constants
 */
export const EnvOptions = {
    PROD: 'prod',
    QA: 'qa',
    DEVELOPMENT: 'development',
    TEST: 'test'
}

/*
 * action creators
 */
export function setEnv(text) {
    return {
      type: SET_ENV,
      text
    }
}

export function getEnv() {
    return {
        type: GET_ENV
    }
}

export const getEnvHOC = (envState, filter) => {
    switch (filter) {
      case 'GET_ENV':
        return envState
    }
}

const mapEnvStateToProps = state => {
    return {
      env: getEnvHOC(state.env, state.envFilter)
    }
}