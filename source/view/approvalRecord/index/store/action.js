import { createAction } from 'redux-actions';
import {
    INCREASE,
    REDUCE
} from './actionTypes'

export const increaseAction = { type: INCREASE }
export const reduceAction = { type: REDUCE }

export default {
    increaseAction,
    reduceAction
}