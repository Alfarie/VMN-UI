import React from 'react'
import SensorCard from './SensorCard'
import SwipeableViews from 'react-swipeable-views'
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { Button } from 'antd'

const mapStateToProps = (state, props) => {
  const { control } = state.control
  const { datetime } = state.realTime
  return {
    nodes: state.realTime.nodes,
    control,
    datetime,
    flowRate: state.operation['water-flow'],
    stationName: state.operation['station-name'],
    dripper: state.operation['number-drippers'],
    numberPlants: state.operation['number-plant'],
    operation: state.operation.operation,
  }
}

@connect(mapStateToProps)
class Plant extends React.Component {
  state = {
    mode: 0,
    totalConsume: [0, 0, 0, 0, 0, 0, 0, 0],
    currentConsume: [0, 0, 0, 0, 0, 0, 0, 0],
    plantName: ['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4'],
  }

  getPercentDrain = () => {
    const { control, flowRate, numberPlants, datetime, dripper} = this.props
    const flowRateLS = flowRate.map(flow => flow * 0.000277777778)

    const timersList = control.map(({timer}) => 'list' in timer ? timer.list : [])
      .reduce((p, c) => ([...p, c, c]), [])

    const totalSecond = timersList.map(list => (list.reduce( (p, c) => p + c[1], 0)))
    const totalConsume = totalSecond.map( (sec, ind) => sec * flowRateLS[ind] * dripper[ind]/ numberPlants[ind])

    const currentMin = moment(datetime).hour() * 60 + moment(datetime).minute()
    const currentSecond = timersList.map(list =>
      list.filter( times => times[0] <= currentMin)
        .reduce( (p, c) => p + c[1], 0)
    )
    const currentConsume = currentSecond.map( (sec, ind) =>  sec * flowRateLS[ind] * dripper[ind] / numberPlants[ind])
    this.setState({ totalConsume, currentConsume })
  }

  componentDidMount() {
    setTimeout(() => {
      this.getPercentDrain()
    }, 1000)
  }

  renderMobile() {
    // console.log(this.props.nodes)
    const { nodes, stationName, operation, numberPlants } = this.props
    const { currentConsume, totalConsume } = this.state
    return (
      <SwipeableViews>
        <div className="row">
          <SensorCard
            id={stationName[0]}
            numberOfPlant={numberPlants[0]}
            value={nodes[1]}
            mode={this.state.mode}
            totalConsume={totalConsume[0]}
            currentConsume={currentConsume[0]}
          />
          <SensorCard
            id={stationName[2]}
            numberOfPlant={numberPlants[2]}
            value={nodes[3]}
            mode={this.state.mode}
            totalConsume={totalConsume[2]}
            currentConsume={currentConsume[2]}
          />
          <SensorCard
            id={stationName[1]}
            numberOfPlant={numberPlants[1]}
            value={nodes[2]}
            mode={this.state.mode}
            totalConsume={totalConsume[1]}
            currentConsume={currentConsume[1]}
          />
          <SensorCard
            id={stationName[3]}
            numberOfPlant={numberPlants[3]}
            value={nodes[4]}
            mode={this.state.mode}
            totalConsume={totalConsume[3]}
            currentConsume={currentConsume[3]}
          />
        </div>
        <div className="row">
          <SensorCard
            id={stationName[4]}
            numberOfPlant={numberPlants[4]}
            value={nodes[5]}
            mode={this.state.mode}
            totalConsume={totalConsume[4]}
            currentConsume={currentConsume[4]}
          />
          <SensorCard
            id={stationName[6]}
            numberOfPlant={numberPlants[6]}
            value={nodes[7]}
            mode={this.state.mode}
            totalConsume={totalConsume[6]}
            currentConsume={currentConsume[6]}
          />
          <SensorCard
            id={stationName[5]}
            numberOfPlant={numberPlants[5]}
            value={nodes[6]}
            mode={this.state.mode}
            totalConsume={totalConsume[5]}
            currentConsume={currentConsume[5]}
          />
          <SensorCard
            id={stationName[7]}
            numberOfPlant={numberPlants[7]}
            value={nodes[8]}
            mode={this.state.mode}
            totalConsume={totalConsume[7]}
            currentConsume={currentConsume[7]}
          />
        </div>
      </SwipeableViews>
    )
  }

  renderBrowser() {
    const { nodes, stationName, numberPlants } = this.props
    const { currentConsume, totalConsume } = this.state
    return (
      <div>
        <div className="row">
          <SensorCard id={stationName[0]}
            numberOfPlant={numberPlants[0]}
            value={nodes[1]}
            mode={this.state.mode}
            totalConsume={totalConsume[0]}
            currentConsume={currentConsume[0]}
          />
          <SensorCard
            id={stationName[2]}
            numberOfPlant={numberPlants[2]}
            value={nodes[3]}
            mode={this.state.mode}
            totalConsume={totalConsume[2]}
            currentConsume={currentConsume[2]}
          />
          <SensorCard
            id={stationName[1]}
            numberOfPlant={numberPlants[1]}
            value={nodes[2]}
            mode={this.state.mode}
            totalConsume={totalConsume[1]}
            currentConsume={currentConsume[1]}
          />
          <SensorCard
            id={stationName[3]}
            numberOfPlant={numberPlants[3]}
            value={nodes[4]}
            mode={this.state.mode}
            totalConsume={totalConsume[3]}
            currentConsume={currentConsume[3]}
          />
        </div>
        <div className="row">
          <SensorCard
            id={stationName[4]}
            numberOfPlant={numberPlants[4]}
            value={nodes[5]}
            mode={this.state.mode}
            totalConsume={totalConsume[4]}
            currentConsume={currentConsume[4]}
          />
          <SensorCard
            id={stationName[6]}
            numberOfPlant={numberPlants[6]}
            value={nodes[7]}
            mode={this.state.mode}
            totalConsume={totalConsume[6]}
            currentConsume={currentConsume[6]}
          />
          <SensorCard
            id={stationName[5]}
            numberOfPlant={numberPlants[5]}
            value={nodes[6]}
            mode={this.state.mode}
            totalConsume={totalConsume[5]}
            currentConsume={currentConsume[5]}
          />
          <SensorCard
            id={stationName[7]}
            numberOfPlant={numberPlants[7]}
            value={nodes[8]}
            mode={this.state.mode}
            totalConsume={totalConsume[7]}
            currentConsume={currentConsume[7]}
          />
        </div>
      </div>
    )
  }

  render() {
    const { operation } = this.props
    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <div className="d-flex justify-content-between">
            <span className="text-uppercase font-size-16">
              {' '}
              Crop: <strong>{operation['crop-name']}</strong>{' '}
            </span>
            <Button.Group>
              <Button type="default" onClick={() => this.setState({ mode: 0 })}>
                Volume
              </Button>
              <Button type="default" onClick={() => this.setState({ mode: 1 })}>
                % Drain
              </Button>
            </Button.Group>
          </div>
        </div>
        <MobileView>{this.renderMobile()}</MobileView>
        <BrowserView>{this.renderBrowser()}</BrowserView>
      </div>
    )
  }
}

export default Plant
