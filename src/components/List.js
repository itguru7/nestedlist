import React from 'react';
import { connect } from 'react-redux'
import * as listActions from '../actions';
import ListItem from './ListItem';

class _List extends React.Component {
  state = { content: '' }

  addListitem = () => {
    const { content } = this.state

    if (content.length > 0) {
      this.props.addListitem([], content)
      this.setState({ content: '' })
    }
  }

  render() {
    const { list } = this.props
    const { content } = this.state

    return (
      <ul>
        { list.sublist.map( (sublist, index) => {
          let childId = [index]
          return <ListItem key={index} parentList={list} itemIndex={index} itemId={childId}/>
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
    )
  }
}

const mapStateToProps = ({ list }) => {
  return {
    list: list.list
  }
}

const List = connect(mapStateToProps, listActions)(_List)

export default List
