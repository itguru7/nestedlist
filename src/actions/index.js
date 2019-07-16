import * as actionTypes from './actionTypes';

export const addSublist = (idList) => dispatch => {
  dispatch({
    type: actionTypes.ADD_SUBLIST,
    idList
  })
}

export const removeSublist = (idList) => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_SUBLIST,
    idList
  })
}

export const addListitem = (idList, content) => dispatch => {
  dispatch({
    type: actionTypes.ADD_LISTITEM,
    idList,
    content
  })
}

export const removeListitem = (idList, itemIndex) => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_LISTITEM,
    idList,
    itemIndex
  })
}

export const moveupListitem = (idList, itemIndex) => dispatch => {
  dispatch({
    type: actionTypes.MOVE_UP_LISTITEM,
    idList,
    itemIndex
  })
}

export const movedownListitem = (idList, itemIndex) => dispatch => {
  dispatch({
    type: actionTypes.MOVE_DOWN_LISTITEM,
    idList,
    itemIndex
  })
}
