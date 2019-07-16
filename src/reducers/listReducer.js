import * as actionTypes from '../actions/actionTypes';

function doListAction(action, item, idList) {
  if (idList.length === 0) {
    let childItem

    switch (action.type) {
      case actionTypes.ADD_SUBLIST:
        item.sub = true
        item.sublist = []
        break;

      case actionTypes.REMOVE_SUBLIST:
        item.sub = false
        item.sublist = []
        break;

      case actionTypes.ADD_LISTITEM:
        item.sublist.push({
          content: action.content,
          sub: false,
          sublist: [],
        })
        break;

      case actionTypes.REMOVE_LISTITEM:
        item.sublist.splice(action.itemIndex, 1)
        break;

      case actionTypes.MOVE_UP_LISTITEM:
        childItem = item.sublist[action.itemIndex]
        item.splice(action.itemIndex, 1)
        item.splice(action.itemIndex-1, 0, childItem)
        break;

      case actionTypes.MOVE_DOWN_LISTITEM:
        childItem = item.sublist[action.itemIndex]
        item.splice(action.itemIndex, 1)
        item.splice(action.itemIndex+1, 0, childItem)
        break;

      default:
        return;
    }
    return;
  }

  doListAction(action, item.sublist[idList[0]], idList.slice(1))
}

const INITIAL_STATE = {
  list: {
    sublist: []
  },
}

export default (state = { ...INITIAL_STATE }, action) => {
  let list = JSON.parse(JSON.stringify(state.list));

  let arrActions = [
    actionTypes.ADD_SUBLIST, 
    actionTypes.REMOVE_SUBLIST, 
    actionTypes.ADD_LISTITEM, 
    actionTypes.REMOVE_LISTITEM, 
    actionTypes.MOVE_UP_LISTITEM, 
    actionTypes.MOVE_DOWN_LISTITEM, 
  ]
  if (arrActions.includes(action.type)) {
    console.log(action.idList);
    doListAction(action, list, action.idList)
  }

  return { list }
}
