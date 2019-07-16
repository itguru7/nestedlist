import React from 'react';
import { connect } from 'react-redux'
import * as listActions from '../actions';

class _ListItem extends React.Component {
  state = { content: '' }

  addSublist = () => {
    const { itemId } = this.props

    this.props.addSublist(itemId)
  }

  removeSublist = () => {
    const { itemId } = this.props

    this.props.removeSublist(itemId)
  }

  addListitem = () => {
    const { itemId } = this.props
    const { content } = this.state

    if (content.length > 0) {
      this.props.addListitem(itemId, content)
      this.setState({ content: '' })
    }
  }

  removeListitem = () => {
    const { itemIndex, itemId } = this.props

    itemId.pop()

    this.props.removeListitem(itemId, itemIndex)
    this.setState({ content: '' })
  }

  moveupListitem = () => {
    const { itemIndex, itemId } = this.props

    itemId.pop()

    this.props.moveupListitem(itemId, itemIndex)
    this.setState({ content: '' })
  }

  movedownListitem = () => {
    const { itemIndex, itemId } = this.props

    itemId.pop()

    this.props.movedownListitem(itemId, itemIndex)
  }

  render() {
    const { parentList, itemIndex, itemId } = this.props
    const { content } = this.state

    const item = parentList.sublist[itemIndex]

    return (
      <li>
        <span>{item.content}&nbsp;</span>
          { itemIndex > 0 &&
            <button onClick={this.moveupListitem}>&uarr;</button>
          }
          { itemIndex < parentList.sublist.length - 1 &&
            <button onClick={this.movedownListitem}>&darr;</button>
          }
          &nbsp;
          { item.sub ?
            <button onClick={this.removeSublist}>Remove Sublist</button>
          :
            <button onClick={this.addSublist}>Add Sublist</button>
          }
          &nbsp;
          <button onClick={this.removeListitem}>Remove</button>
          { item.sub &&
            <ul>
              { item.sublist.map( (sublist, index) => {
                  let childId = itemId.concat([index])
                  return <ListItem key={index} parentList={item} itemIndex={index} itemId={childId}/>
              } )}
              <li>
                <input
                  type="text"
                  value={content}
                  onChange={(event) => { this.setState({ content: event.target.value }) } }
                  onKeyPress={(event) => {
                    if (event.keyCode === 13 || event.charCode === 13) {
                      event.preventDefault()
                      this.addListitem()
                    }
                  }}
                />
                &nbsp;
                <button
                  onClick={this.addListitem}
                >Add</button>
              </li>
            </ul>
          }
      </li>
    )
  }
}

const ListItem = connect(null, listActions)(_ListItem)

export default ListItem
