import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TableBody from './TableBody'
import TableHead from './TableHead'

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
    const { hideColumns, ids } = this.props
    this.state = {
      schema: this.getSchema(hideColumns),
      hideColumns,
      widths: {},
      sortState: {},
      ids,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { hideColumns, ids } = this.props
    if (ids !== nextProps.ids) {
      this.setState({
        ids: nextProps.ids,
      })
    }
    if (hideColumns !== nextProps.hideColumns) {
      this.setState({
        hideColumns: nextProps.hideColumns,
      })
    }
  }

  reorderColumn = (startIndex, targetIndex, callback) => {
    const { schema } = this.state
    console.log(startIndex, targetIndex)
    this.setState({
      schema: reorder(schema, startIndex, targetIndex),
    }, callback)
  }

  reorderRow = (startIndex, targetIndex) => {
    const { ids } = this.state
    this.setState({
      ids: reorder(ids, startIndex, targetIndex)
    })
  }

  setWidth = widths => {
    this.setState({
      widths,
    })
  }

  hideColumn = (key) => {
    const { hideColumns } = this.state
    const newHideColumns = hideColumns.concat(key)
    this.setState({
      hideColumns: newHideColumns,
      schema: this.getSchema(newHideColumns),
    })
  }

  showColumn = (key) => {
    const { hideColumns } = this.state
    const newHideColumns = hideColumns.filter(col => col !== key)
    this.setState({
      hideColumns: newHideColumns,
      schema: this.getSchema(newHideColumns)
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
    console.log(hideColumns)
    const { schema } = this.props
    return schema.filter(col => !hideColumns.includes(col.key))
  }

  render() {
    const { widths, hideColumns, ids, schema } = this.state
    const {
      columnDraggable,
      rowDraggable,
      resizeable,
      getDataFromRedux,
    } = this.props
    return (
      <div>
        <table className="scroll-table border-table">
          <TableHead
            ids={ids}
            draggable={columnDraggable}
            setColumnWidth={this.setWidth}
            widths={widths}
            schema={schema}
            reorder={this.reorderColumn}
            resizeable={resizeable}
            onSort={this.sortData}
          />
          <TableBody
            getDataFromRedux={getDataFromRedux}
            widths={widths}
            draggable={rowDraggable}
            reorder={this.reorderRow}
            schema={schema}
            ids={ids}
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
  ids: PropTypes.array,
  schema: PropTypes.array,
  columnDraggable: PropTypes.bool,
  rowDraggable: PropTypes.bool,
  resizeable: PropTypes.bool,
  hideColumns: PropTypes.array,
  getDataFromRedux: PropTypes.func.isRequired,
  onSort: PropTypes.func,
}

Table.defaultProps = {
  ids: [],
  schema: [],
  hideColumns: [],
  columnDraggable: false,
  rowDraggable: false,
  resizeable: false,
  onReorderRow: () => {},
  onSort: () => {},
}

export default Table
