import React from 'react';

const INITIAL_STATE = {
  content: '',
  sub: true,
  sublist: {},
}

class List extends React.Component {
  state = { ...INITIAL_STATE }

  componentWillMount() {
    this.init(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const { content, sub, sublist } = props

    this.setState({
      content: content,
      sub: sub,
      sublist: sublist
    })
  }

  moveUp = () => {
    const { index } = this.props
    this.props.moveUp(index);
  }

  moveDown = () => {
    const { index } = this.props
    this.props.moveDown(index);
  }

  removeSublist = () => {
    const { index } = this.props
    this.props.moveDown(index);
  }

  render() {
    const { up, down, index } = this.props
    const { content, sub, sublist } = this.state

    return (
      <li>
        <span>{content}</span>
        { up &&
          <button onClick={this.moveUp}>&uarr;</button>
        }
        { down &&
          <button onClick={this.moveDown}>&darr;</button>
        }
        { sub ?
          <button onClick={this.removeSublist}>Remove Sublist</button>
        :
          <button>Add Sublist</button>
        }
        <button>Remove</button>
        { sub &&
          <ul>
            { sublist.map( (list, i) => {
                let up = (i > 1);
                let down = (i < sublist.length - 1);
                return <List list={list} up={up} down={down} index={i} moveUp={this.childMoveUp} moveDown={this.childMoveDown}/>
              } )
            },
            <li><input/><button>Add</button></li>
          </ul>
        }
      </li>
    )
  }
}

export default List;
