import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
      case actionTypes.ADD_NEW_LIST:
        return action.payload
      default:
        return state
    }
  }
  