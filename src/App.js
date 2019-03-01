import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateData } from './actions'
import Table from './components/Table'
import './App.scss'

import TextBlink from './components/TextBlink'

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
    render: (text) => <TextBlink>{text}</TextBlink>
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

class App extends Component {
  updateData = (e) => {
    e.preventDefault()
    const { updateData } = this.props
    updateData()
  }

  sort = (key, type) => {
    console.log(key, type)
  }

  render() {
    const { ids } = this.props
    return (
      <div className="App">
        <Table
          ids={ids}
          schema={schema}
          resizeable={true}
          columnDraggable={true}
          rowDraggable={true}
          hideColumns={['change']}
          getDataFromRedux={state => state.data}
        />

        <button onClick={this.updateData}>Update data</button>
      </div>
    )
  }
}

const mapStateToProps = ({ ids }) => ({ ids })
const mapDispatchToProps = { updateData }

export default connect(mapStateToProps, mapDispatchToProps)(App)
