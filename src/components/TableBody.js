import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class TableBody extends PureComponent {
  getStyle = (key) => {
    const { widths } = this.props
    if (!widths[key]) {
      return {}
    }

    return {
      width: widths[key]
    }
  }

  renderColumn = (item, col, colIndex, rowIndex) => {
    if (col.render && typeof col.render === 'function') {
      return (
        <td className={col.className} style={this.getStyle(col.key)} key={colIndex}>
          {col.render(item[col.key], item, rowIndex)}
        </td>
      )
    }

    return (
      <td className={col.className} style={this.getStyle(col.key)} key={colIndex}>
        {item[col.key]}
      </td>
    )
  }

  onDragEnd = (result) => {
    const { reorder } = this.props
    reorder(result.source.index, result.destination.index)
  }

  render() {
    const { data, schema, draggable } = this.props
    if (!draggable) {
      return (
        <tbody>
          {data.map(item =>
            <tr>
            {schema.map((col, colIndex) => this.renderColumn(item, col, colIndex))}
            </tr>
          )}
        </tbody>
      )
    }
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableRow">
          {(provided) => (
            <tbody ref={provided.innerRef}>
            {data.map((item, rowIndex) => (
              <Draggable key={rowIndex} draggableId={item.id} index={rowIndex}>
                {(provided) => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item.id}
                  >
                    {schema.map((col, colIndex) => this.renderColumn(item, col, colIndex, rowIndex))}
                  </tr>
                )}
              </Draggable>

            ))}
            </tbody>
          )}
        </Droppable>

      </DragDropContext>
    )
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
  widths: PropTypes.object,
  draggable: PropTypes.bool.isRequired,
}

TableBody.defaultProps = {
  reorder: () => {},
  widths: {},
}

export default TableBody
