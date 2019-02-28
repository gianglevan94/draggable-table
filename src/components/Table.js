import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TableBody from './TableBody'
import TableHead from './TableHead'

const item = {
  index: 'VN-Index',
  last: 'Sunny Garton',
  change: '(288) 1417941',
  percentChange: 'GMC',
  volume: 'Savana 2500',
  value: 'Yellow',
  buyVolume: '$99799.94',
  sellVolume: '2016-03-23',
  foreignNet: 5,
  putThoughVol: 2,
  putThoughValue: 2,
}

const data = [...Array(10)].map((it, index) => ({ id: index + 1, ...item }))

const schema = [
  {
    key: 'id',
    title: 'ID',
  },
  {
    key: 'index',
    title: 'INDEX',
    render: text => <><i className="icon-graph fs-10" />{text}</>
  },
  {
    key: 'last',
    title: 'LAST',
    render: (text, item, index) => (
      <div className={index % 2 === 0 ? 'text-s-color-5' : 'text-s-color-3'}>{text}</div>
    ),
  },
  {
    key: 'change',
    title: 'CHANGE',
  },
  {
    key: 'percentChange',
    title: '% CHANGE',
  },
  {
    key: 'volume',
    title: 'VOLUME',
  },
  {
    key: 'value',
    title: 'VALUE',
  },
  {
    key: 'buyVolume',
    title: 'FR. BUY VOL',
  },
  {
    key: 'sellVolume',
    title: 'FR. SELL VOL',
  },
  {
    key: 'foreignNet',
    title: 'FOREIGN NET',
  },
  {
    key: 'putThoughVol',
    title: 'PUT THROUGH VOL',
  },
  {
    key: 'putThoughValue',
    title: 'PUT THROUGH VALUE',
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
      widths: {},
      hideColumns: [],
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
      hideColumns: hideColumns.concat(key)
    })
  }

  showColumn = (key) => {
    const { hideColumns } = this.state

    this.setState({
      hideColumns: hideColumns.filter(col => col !== key)
    })
  }

  onCheckBoxChange = (e) => {
    if (e.target.checked) {
      this.showColumn(e.target.name)
      return
    }
    this.hideColumn(e.target.name)
  }

  getSchema = () => {
    const { schema, hideColumns } = this.state

    return schema.filter(col => !hideColumns.includes(col.key))
  }

  render() {
    const { schema, data, widths, hideColumns } = this.state
    const { columnDraggable, rowDraggable, resizeable } = this.props
    return (
      <div>
        <table className="scroll-table border-table">
          <TableHead
            draggable={columnDraggable}
            setColumnWidth={this.setWidth}
            widths={widths}
            schema={this.getSchema()}
            reorder={this.reorderColumn}
            resizeable={resizeable}
          />
          <TableBody
            widths={widths}
            draggable={rowDraggable}
            reorder={this.reorderRow}
            schema={this.getSchema()}
            data={data}
          />
        </table>

        <div className="d-flex mt-3">
          {schema.map((col) => (
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
}

Table.defaultProps = {
  data,
  schema,
  columnDraggable: false,
  rowDraggable: false,
  resizeable: false,
}

export default Table
