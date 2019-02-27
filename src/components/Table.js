import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Head from './Head'

const item = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  age: 20,
  address: 'Viet Nam'
}

const data = [...Array(10)].map((it, index) => ({ id: index + 1, ...item }))

const schema = [
  {
    key: 'id',
    title: '#',
    width: '5%',
  },
  {
    key: 'firstName',
    title: 'Firstname',
    width: '15%',
  },
  {
    key: 'lastName',
    title: 'Last Name',
    width: '15%',
    render: (text) => <div onClick={() => alert(text)}>{text}</div>
  },
  {
    key: 'email',
    title: 'Email',
    width: '15%',
  },
  {
    key: 'age',
    title: 'Age',
    width: '15%',
  },
  {
    key: 'address',
    title: 'Address',
    width: '15%',
  },
]

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Table extends PureComponent {
  constructor(props) {
    super(props)
    const { schema, data } = this.props
    this.state = {
      schema,
      data,
    }
    this.head = {}
  }

  onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const schema = reorder(
      this.state.schema,
      result.source.index,
      result.destination.index
    )

    this.setState({
      schema,
    })
  }

  reorderColumn = (startIndex, targetIndex) => {
    const { schema } = this.state
    this.setState({
      schema: reorder(schema, startIndex, targetIndex),
    })
  }

  onColumnDragStart = (index) => () => {
    this.dragColumnIndex = index
  }

  onColumnDragOver = (index) => (e) => {
    const { schema } = this.state
    const column = schema[index]
    if (index === this.dragColumnIndex) {
      return
    }
    const targetRect = this.head[column.key].getBoundingClientRect()
    const middle = (targetRect.right - targetRect.left) / 2
    const hoverClientX = e.clientX - targetRect.left
    if (this.dragColumnIndex < index && hoverClientX < middle) {
      return
    }

    if (this.dragColumnIndex > index && hoverClientX > middle) {
      return
    }

    const newSchema = reorder(this.state.schema, this.dragColumnIndex, index)
    this.setState({
      schema: newSchema,
    }, () => this.dragColumnIndex = index)
  }

  renderHead = () => {
    const { schema } = this.state
    return (
      <div className="row">
        {schema.map((col, colIndex) => (
          <div
            ref={el => this.head[col.key] = el}
            onDragStart={this.onColumnDragStart(colIndex)}
            onDragOver={this.onColumnDragOver(colIndex)}
            draggable={true}
            key={colIndex}
            className="column"
            style={{ width: col.width }}
          >
            {col.title}
          </div>
        ))}
      </div>
    )
  }

  onRowDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const data = reorder(
      this.state.data,
      result.source.index,
      result.destination.index
    )

    this.setState({
      data,
    })
  }

  renderBody = () => {
    const { data, schema } = this.state
    return (
      <DragDropContext onDragEnd={this.onRowDragEnd}>
        <Droppable droppableId="droppableRow">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {data.map((item, rowIndex) => (
                <Draggable key={rowIndex} draggableId={item.id} index={rowIndex}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={rowIndex}
                      className="row"
                    >
                      {schema.map((col, colIndex) => (
                        <div
                          style={{ width: col.width }}
                          key={colIndex}
                          className="column"
                        >
                          {col.render && typeof col.render === 'function' ? col.render(item[col.key]) : item[col.key]}
                        </div>
                      ))}
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
    return (
      <tbody>
      {data.map((item, rowIndex) => (
        <tr key={rowIndex}>
          {schema.map((col, colIndex) => (
            <td key={colIndex}>
              {col.render && typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    )
  }

  render() {
    const { schema } = this.state
    return (
      <div className="table">
        <Head schema={schema} reorder={this.reorderColumn} />
        {/*{this.renderHead()}*/}
        {this.renderBody()}
      </div>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  schema: PropTypes.array.isRequired,
}

Table.defaultProps = {
  data,
  schema,
}

export default Table
