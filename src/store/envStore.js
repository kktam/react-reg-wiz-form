import { createStore } from 'redux'
import appEnv from './envReducer'

const appEnvStore = createStore(appEnv);

export default appEnvStore;
