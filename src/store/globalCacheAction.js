/*
 * action types
 */
export const SET_KEY_VALUE = 'SET_KEY_VALUE'
export const GET_VALUE = 'GET_VALUE'

/*
 * action creators
 */
export function setKeyValue(userKey, userValue) {
    return {
      type: SET_KEY_VALUE,
      data: {key: userKey, value: userValue}
    }
}

export function getValue(userKey) {
    return {
        type: GET_VALUE,
        key: userKey
    }
}
