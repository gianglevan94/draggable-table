import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Cell from './Cell'

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


  onDragEnd = (result) => {
    const { reorder } = this.props
    reorder(result.source.index, result.destination.index)
  }

  render() {
    const { ids, schema, draggable, widths, getDataFromRedux } = this.props
    if (!draggable) {
      return (
        <tbody>
        {ids.map((id, rowIndex) =>
          <tr>
            <Cell
              getDataFromRedux={getDataFromRedux}
              id={id}
              key={rowIndex}
              widths={widths}
              schema={schema}
            />
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
            {ids.map((id, rowIndex) => (
              <Draggable
                key={rowIndex}
                draggableId={id}
                index={rowIndex}
              >
                {(provided) => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Cell
                      getDataFromRedux={getDataFromRedux}
                      id={id}
                      key={rowIndex}
                      widths={widths}
                      schema={schema}
                    />
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
  ids: PropTypes.array.isRequired,
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
  widths: PropTypes.object,
  draggable: PropTypes.bool.isRequired,
  getDataFromRedux: PropTypes.func,
}

TableBody.defaultProps = {
  reorder: () => {},
  widths: {},
  getDataFromRedux: () => {},
}

export default TableBody
