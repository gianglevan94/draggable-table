import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TableBody from './TableBody'
import TableHead from './TableHead'
import orderBy from 'lodash/orderBy'

export const SORT_TYPES = {
  ASC: 'asc',
  DESC: 'desc',
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Table extends PureComponent {
  constructor(props) {
    super(props)
    const { data, hideColumns } = this.props
    this.state = {
      data,
      hideColumns,
      schema: this.getSchema(hideColumns),
      widths: {},
      sortState: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, hideColumns } = this.props
    if (data !== nextProps.data) {
      this.setState({
        data: nextProps.data,
      })
    }
    if (hideColumns !== nextProps.hideColumns) {
      this.setState({
        hideColumns: nextProps.hideColumns,
      })
    }
  }

  reorderColumn = (startIndex, targetIndex) => {
    const { schema } = this.state
    this.setState({
      schema: reorder(schema, startIndex, targetIndex),
    })
  }

  reorderRow = (startIndex, targetIndex) => {
    const { data } = this.state
    this.setState({
      data: reorder(data, startIndex, targetIndex),
    })
  }

  setWidth = widths => {
    this.setState({
      widths,
    })
  }

  hideColumn = (key) => {
    const { hideColumns } = this.state

    this.setState({
      hideColumns: hideColumns.concat(key),
      schema: this.getSchema(hideColumns.concat(key)),
    })
  }

  showColumn = (key) => {
    const { hideColumns } = this.state
    const newHideColumns = hideColumns.filter(col => col !== key)
    this.setState({
      hideColumns: newHideColumns,
      schema: this.getSchema(newHideColumns),
    })
  }

  onCheckBoxChange = (e) => {
    if (e.target.checked) {
      this.showColumn(e.target.name)
      return
    }
    this.hideColumn(e.target.name)
  }

  getSchema = hideColumns => {
    const { schema } = this.props

    return schema.filter(col => !hideColumns.includes(col.key))
  }

  sortData = (key, type) => {
    const { data } = this.state
    this.setState({
      data: orderBy(data, [key], [type])
    })
  }

  render() {
    const { data, widths, hideColumns, schema } = this.state
    const { columnDraggable, rowDraggable, resizeable } = this.props
    return (
      <div>
        <table className="scroll-table border-table">
          <TableHead
            draggable={columnDraggable}
            setColumnWidth={this.setWidth}
            widths={widths}
            schema={schema}
            reorder={this.reorderColumn}
            resizeable={resizeable}
            onSort={this.sortData}
          />
          <TableBody
            widths={widths}
            draggable={rowDraggable}
            reorder={this.reorderRow}
            schema={schema}
            data={data}
          />
        </table>

        <div className="d-flex mt-3">
          {this.props.schema.map((col) => (
            <div key={col.key} className="custom-control custom-checkbox mr-3">
              <input
                checked={!hideColumns.includes(col.key)}
                type="checkbox"
                name={col.key}
                className="custom-control-input"
                id={`customCheck1_${col.key}`}
                onChange={this.onCheckBoxChange}
              />
              <label className="custom-control-label" htmlFor={`customCheck1_${col.key}`}>
                {col.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  schema: PropTypes.array.isRequired,
  columnDraggable: PropTypes.bool,
  rowDraggable: PropTypes.bool,
  resizeable: PropTypes.bool,
  hideColumns: PropTypes.array,
}

Table.defaultProps = {
  data: [],
  schema: [],
  hideColumns: [],
  columnDraggable: false,
  rowDraggable: false,
  resizeable: false,
}

export default Table
