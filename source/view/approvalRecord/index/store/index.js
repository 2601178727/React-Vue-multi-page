import {
    createStore
} from 'redux'
import store from './store'
import { handleActions } from 'redux-actions'
import {
    INCREASE,
    REDUCE
} from './actionTypes'

const counter = handleActions({
    [INCREASE]: (state, action) => ({ ...state, count: state.count + 1 }),
    [REDUCE]: (state, action) => ({ ...state, count: state.count - 1 })
}, store)

// Store
const Store = createStore(counter)


export default Store