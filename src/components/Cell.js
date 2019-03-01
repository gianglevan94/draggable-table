import React from 'react'
import { connect } from 'react-redux'

class Cell extends React.PureComponent {
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
      <td
        className={col.className}
        style={this.getStyle(col.key)}
        key={colIndex}
      >
        {item[col.key]}
      </td>
    )
  }

  render() {
    console.log('cell render')
    const { schema, item, ...rest } = this.props
    return (
      <>
        {schema.map((col, colIndex) => this.renderColumn(item, col, colIndex))}
      </>
    )
  }
}

const mapStateToProps = (state, { id, getDataFromRedux }) => {
  return {
    item: getDataFromRedux(state)[id],
  }
}

export default connect(mapStateToProps)(Cell)
