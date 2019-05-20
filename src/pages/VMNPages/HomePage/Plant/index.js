import React from 'react'
import SensorCard from './SensorCard'
import SwipeableViews from 'react-swipeable-views'
import { BrowserView, MobileView } from 'react-device-detect'
import moment from 'moment'
import { connect } from 'react-redux'
import { Button } from 'antd'

const mapStateToProps = (state, props) => {

  const { control } = state.control
  const {datetime} = state.realTime
  return {
    nodes: state.realTime.nodes,
    control,
    datetime,
    flowRate: state.operation['water-flow'],
    stationName: state.operation['station-name'],
    numberPlants: state.operation['number-plant'],
    operation: state.operation.operation
  }
}

@connect(mapStateToProps)
class Plant extends React.Component {
  state = {
    mode: 0,
    totalConsume: [0, 0, 0, 0, 0, 0, 0, 0],
    currentConsume: [0, 0, 0, 0, 0, 0, 0, 0],
    plantName: ['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4']
  }

  getPercentDrain = () => {
    const { control, flowRate, numberPlants } = this.props
    const flowRateLS = flowRate.map(flow => flow * 0.000277777778)

    // total consume calculation
    var totalSecond = control.map(ctrl => {
      var second = 0;
      ctrl.timer.list.forEach((list, index) => {
        second += list[1]
      })
      return [second, second];
    });
    totalSecond = JSON.parse('[' + totalSecond.join() + ']')
    var totalConsume = [0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 0; i < totalConsume.length; i += 1) {
      totalConsume[i] = totalSecond[i] * flowRateLS[i] /  numberPlants[i];
    }

    // current consume calculation
    //get datetime to current min
    const currentTime = moment(this.props.datetime);
    const currentMin = currentTime.hour() * 60 + currentTime.minute();
    var currentSecond = control.map(ctrl => {
      var second = 0;
      ctrl.timer.list.forEach((list, index) => {
        if(list[0] >= currentMin) return;
        second += list[1]
      })
      return [second, second];
    });
    currentSecond = JSON.parse('[' + currentSecond.join() + ']')
    var currentConsume = [0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < currentConsume.length; i += 1) {
      currentConsume[i] = currentSecond[i] * flowRateLS[i] / numberPlants[i];
    }


    this.setState({ totalConsume, currentConsume })
  }

  componentDidMount() {
    setTimeout(() => {
      this.getPercentDrain()
    }, 3000);
  }

  renderMobile() {
    // console.log(this.props.nodes)
    const { nodes, stationName, operation, numberPlants } = this.props
    const {currentConsume, totalConsume} = this.state
    return (
      <SwipeableViews>
        <div className="row">
          <SensorCard id={stationName[0]} numberOfPlant={numberPlants[0]} value={nodes[1]} mode={this.state.mode} totalConsume={totalConsume[0]} currentConsume={currentConsume[0]}/>
          <SensorCard id={stationName[2]} numberOfPlant={numberPlants[2]} value={nodes[3]} mode={this.state.mode} totalConsume={totalConsume[2]} currentConsume={currentConsume[2]}/>
          <SensorCard id={stationName[1]} numberOfPlant={numberPlants[1]} value={nodes[2]} mode={this.state.mode} totalConsume={totalConsume[1]} currentConsume={currentConsume[1]}/>
          <SensorCard id={stationName[3]} numberOfPlant={numberPlants[3]} value={nodes[4]} mode={this.state.mode} totalConsume={totalConsume[3]} currentConsume={currentConsume[3]}/>
        </div>
        <div className="row">
          <SensorCard id={stationName[4]} numberOfPlant={numberPlants[4]} value={nodes[5]} mode={this.state.mode} totalConsume={totalConsume[4]} currentConsume={currentConsume[4]}/>
          <SensorCard id={stationName[6]} numberOfPlant={numberPlants[6]} value={nodes[7]} mode={this.state.mode} totalConsume={totalConsume[6]} currentConsume={currentConsume[6]}/>
          <SensorCard id={stationName[5]} numberOfPlant={numberPlants[5]} value={nodes[6]} mode={this.state.mode} totalConsume={totalConsume[5]} currentConsume={currentConsume[5]}/>
          <SensorCard id={stationName[7]} numberOfPlant={numberPlants[7]} value={nodes[8]} mode={this.state.mode} totalConsume={totalConsume[7]} currentConsume={currentConsume[7]}/>
        </div>
      </SwipeableViews>
    )
  }

  renderBrowser() {
    const { nodes, stationName, numberPlants } = this.props
    const {currentConsume, totalConsume} = this.state
    return (
      <div>
        <div className="row">
          <SensorCard id={stationName[0]}  numberOfPlant={numberPlants[0]} value={nodes[1]} mode={this.state.mode} totalConsume={totalConsume[0]} currentConsume={currentConsume[0]}/>
          <SensorCard id={stationName[2]}  numberOfPlant={numberPlants[2]} value={nodes[3]} mode={this.state.mode} totalConsume={totalConsume[2]} currentConsume={currentConsume[2]}/>
          <SensorCard id={stationName[1]}  numberOfPlant={numberPlants[1]} value={nodes[5]} mode={this.state.mode} totalConsume={totalConsume[1]} currentConsume={currentConsume[1]}/>
          <SensorCard id={stationName[3]}  numberOfPlant={numberPlants[3]} value={nodes[7]} mode={this.state.mode} totalConsume={totalConsume[3]} currentConsume={currentConsume[3]}/>
        </div>
        <div className="row">
          <SensorCard id={stationName[4]}  numberOfPlant={numberPlants[4]} value={nodes[2]} mode={this.state.mode} totalConsume={totalConsume[4]} currentConsume={currentConsume[4]}/>
          <SensorCard id={stationName[6]}  numberOfPlant={numberPlants[6]} value={nodes[4]} mode={this.state.mode} totalConsume={totalConsume[6]} currentConsume={currentConsume[6]}/>
          <SensorCard id={stationName[5]}  numberOfPlant={numberPlants[5]} value={nodes[6]} mode={this.state.mode} totalConsume={totalConsume[5]} currentConsume={currentConsume[5]}/>
          <SensorCard id={stationName[7]}  numberOfPlant={numberPlants[7]} value={nodes[8]} mode={this.state.mode} totalConsume={totalConsume[7]} currentConsume={currentConsume[7]}/>
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
            <span className="text-uppercase font-size-16"> Crop: <strong>{operation['crop-name']}</strong> </span>
            <Button.Group>
              <Button type="default" onClick={() => this.setState({ mode: 0 })}>Volume</Button>
              <Button type="default" onClick={() => this.setState({ mode: 1 })}>% Drain</Button>
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
