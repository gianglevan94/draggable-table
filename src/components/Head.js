import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Head extends PureComponent {
  columnRefs = {}

  onDragStart = (index) => () => {
    this.dragColumnIndex = index
  }

  onDragOver = (index) => (e) => {
    const { reorder, schema } = this.props
    const column = schema[index]
    if (index === this.dragColumnIndex) {
      return
    }
    const targetRect = this.columnRefs[column.key].getBoundingClientRect()
    const middle = (targetRect.right - targetRect.left) / 2
    const hoverClientX = e.clientX - targetRect.left
    if (this.dragColumnIndex < index && hoverClientX < middle) {
      return
    }

    if (this.dragColumnIndex > index && hoverClientX > middle) {
      return
    }
    reorder(this.dragColumnIndex, index)
    this.dragColumnIndex = index
  }

  render() {
    const { schema } = this.props
    return (
      <div className="row">
        {schema.map((col, colIndex) => (
          <div
            ref={el => this.columnRefs[col.key] = el}
            onDragStart={this.onDragStart(colIndex)}
            onDragOver={this.onDragOver(colIndex)}
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
}

Head.propTypes = {
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
}

Head.defaultProps = {
  reorder: () => {}
}

export default Head
