import { createStore } from 'redux'
import globalCacheReducer from './globalCacheReducer'

const globalCacheStore = createStore(globalCacheReducer);

export default globalCacheStore;