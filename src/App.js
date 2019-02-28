import React, { Component } from 'react'
import Table from './components/Table'
import './App.scss'

import TextBlink from './components/TextBlink'

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
  state = {
    data,
  }

  componentDidMount() {
    setInterval(this.randomValue, 2000)
  }

  randomValue = () => {
    this.setState({
      data: data.map(item => ({
        ...item,
        foreignNet: Math.floor(Math.random() * 100)
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <Table
          data={this.state.data}
          schema={schema}
          resizeable={true}
          columnDraggable={true}
          rowDraggable={true}
        />
      </div>
    )
  }
}

export default App
