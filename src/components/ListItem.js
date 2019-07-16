import React from 'react';
import { connect } from 'react-redux'
import * as listActions from '../actions';

class ListItem extends React.Component {
  state = { content: '' }

  addSublist = () => {
    const { itemId } = this.props

    console.log(itemId)

    console.log(this.props.addSublist);
    this.props.addSublist(itemId)
  }

  removeSublist = () => {
    const { itemId } = this.props

    this.props.removeSublist(itemId)
  }

  addListitem = () => {
    const { itemId } = this.props
    const { content } = this.state

    this.props.addListitem(itemId, content)
    this.setState({ content: '' })
  }

  removeListitem = () => {
    const { itemIndex, itemId } = this.props

    let parentId = itemId
    parentId.pop()

    this.props.removeListitem(parentId, itemIndex)
  }

  moveupListitem = () => {
    const { itemIndex, itemId } = this.props

    let parentId = itemId
    parentId.pop()

    this.props.moveupListitem(parentId, itemIndex)
  }

  movedownListitem = () => {
    const { itemIndex, itemId } = this.props

    let parentId = itemId
    parentId.pop()

    this.props.movedownListitem(parentId, itemIndex)
  }

  render() {
    const { parentList, itemIndex, itemId } = this.props
    const { content } = this.state

    const item = parentList.sublist[itemIndex]

    return (
      <li>
        <span>{item.content}</span>
          { itemIndex > 0 &&
            <button onClick={this.moveupListitem}>&uarr;</button>
          }
          { itemIndex < parentList.sublist.length - 1 &&
            <button onClick={this.movedownListitem}>&darr;</button>
          }
          { item.sub ?
            <button onClick={this.removeSublist}>Remove Sublist</button>
          :
            <button onClick={this.addSublist}>Add Sublist</button>
          }
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

export default connect(null, listActions)(ListItem)
