import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { SORT_TYPES } from './Table'

const MIN_WIDTH = 100

class TableHead extends PureComponent {
  state = {
    sortState: {}
  }

  columnRefs = {}

  componentDidMount() {
    this.calcWidths()
    window.addEventListener('mousemove', this.onResize)
    window.addEventListener('mouseup', this.onStopResize)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onResize)
    window.removeEventListener('mouseup', this.onStopResize)
  }

  calcWidths = () => {
    setTimeout(() => {
      const { setColumnWidth } = this.props
      const widthData = Object.keys(this.columnRefs).reduce((result, key) => {
        return {
          ...result,
          [key]: this.columnRefs[key].getBoundingClientRect().width
        }
      }, {})
      setColumnWidth(widthData)
    }, 0)
  }

  onDragStart = (index) => (e) => {
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
    reorder(this.dragColumnIndex, index, () => this.dragColumnIndex = index)
  }

  getStyle = (key) => {
    const initStyle = {
      position: 'relative',
      cursor: 'default',
    }
    const { widths } = this.props
    if (!widths[key]) {
      return initStyle
    }

    return { ...initStyle, width: widths[key] }
  }

  onResizeStart = (key) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.isResize = true
    this.key = key
    this.clientX = e.clientX
  }

  onResize = (e) => {
    if (!this.isResize || !this.key) {
      return
    }
    const { widths, setColumnWidth } = this.props
    setColumnWidth({
      ...widths,
      [this.key]: Math.max(widths[this.key] + (e.clientX - this.clientX), MIN_WIDTH),
    })
    this.clientX = e.clientX
  }

  onStopResize = () => {
    this.isResize = false
    this.key = null
  }

  changeSortState = (key) => (e) => {
    e.preventDefault()
    const { sortState } = this.state
    const { onSort } = this.props
    const sortStateMap = {
      [undefined]: SORT_TYPES.ASC,
      [SORT_TYPES.ASC]: SORT_TYPES.DESC,
      [SORT_TYPES.DESC]: SORT_TYPES.ASC,
    }
    this.setState({
      sortState: {
        [key]: sortStateMap[sortState[key]],
      }
    })
    onSort(key, sortStateMap[sortState[key]])
  }

  render() {
    const { schema, draggable, resizeable } = this.props
    return (
      <thead>
      <tr>
        {schema.map((col, colIndex) => (
          <th
            onClick={this.changeSortState(col.key)}
            key={colIndex}
            ref={el => this.columnRefs[col.key] = el}
            onDragStart={this.onDragStart(colIndex)}
            onDragOver={this.onDragOver(colIndex)}
            draggable={draggable}
            style={this.getStyle(col.key)}
          >
            {col.title}
            {resizeable && (
              <div
                onMouseDown={this.onResizeStart(col.key)}
                style={{
                  height: '100%',
                  display: 'inline-block',
                  width: 8,
                  cursor: 'col-resize',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              />
            )}
          </th>
        ))}
      </tr>
      </thead>
    )
  }
}

TableHead.propTypes = {
  schema: PropTypes.array.isRequired,
  reorder: PropTypes.func,
  setColumnWidth: PropTypes.func,
  widths: PropTypes.object,
  draggable: PropTypes.bool.isRequired,
  resizeable: PropTypes.bool,
  onSort: PropTypes.func,
  ids: PropTypes.array,
}

TableHead.defaultProps = {
  reorder: () => {},
  setColumnWidth: () => {},
  widths: {},
  resizeable: false,
  onSort: () => {},
  ids: [],
}

export default TableHead
