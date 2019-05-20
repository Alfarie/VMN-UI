import React, { Component } from 'react'
import Dygraph from 'dygraphs/index.es5'
import Data from './data'
import moment from 'moment'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    loggerPage: state.logger.loggerPage,
    sensor: state.logger.sensor,
  }
}
@connect(mapStateToProps)
export default class Graph extends Component {
  craftStringData = () => {
    const { sensor, loggerPage } = this.props
    if (loggerPage.length <= 0) return false

    var strData = 'Date,' + sensor + '\n'
    const date = moment(loggerPage[0].datetime).format('MMM Do YYYY')
    loggerPage.forEach(log => {
      const datetime = log.datetime
      const sensorData = log[sensor] - 5 + ';' + log[sensor] + ';' + (log[sensor] + 5)
      const str = datetime + ',' + sensorData + '\n'
      strData += str
    })
    return strData
  }

  updateGraph = () => {
    const data = this.craftStringData()
    if(!data) return
    new Dygraph(this.refs.chart,data, {
      customBars: true,
      // title: 'Sensors in New York vs. San Francisco',
      ylabel: 'Temperature (F)',
      legend: 'always',
      showRangeSelector: true,
    })
  }

  render() {
    // console.log(this.props.loggerPage)
    const { loggerPage, sensor } = this.props

    return loggerPage.length ? (
      <div className="row">
        <div className="col col-xs-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="text-black">
                <strong className="text-capitalize">Graph {`${sensor.toUpperCase()}`}</strong>
              </h5>
            </div>
            <div className="card-body">
              {/* <div ref="chart" style="width:100%; height:300px;"></div> */}
              <div ref="chart" style={{ width: '100%', height: '300px' }} />
            </div>
          </div>
        </div>
      </div>
    ) : null
  }

  componentDidUpdate() {
    this.updateGraph()
  }
}
