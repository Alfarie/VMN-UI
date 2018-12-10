import React from 'react'
import SensorCard from './SensorCard'
import SwipeableViews from 'react-swipeable-views';
import { BrowserView, MobileView } from 'react-device-detect'

import { connect } from 'react-redux'

const mapStateToProps = (state,props) => {
  return {
    nodes: state.realTime.nodes
  }
}
@connect(mapStateToProps)
class Plant extends React.Component {

  renderMobile(){
    // console.log(this.props.nodes)
    const { nodes } = this.props
    return (
      <SwipeableViews>
          <div className="row">
            <SensorCard id="A1" value={nodes[1]}/>
            <SensorCard id="A2" value={nodes[2]}/>
            <SensorCard id="A3" value={nodes[3]}/>
            <SensorCard id="A4" value={nodes[4]}/>
          </div>
          <div className="row">
            <SensorCard id="B1" value={nodes[5]}/>
            <SensorCard id="B2" value={nodes[6]}/>
            <SensorCard id="B3" value={nodes[7]}/>
            <SensorCard id="B4" value={nodes[8]}/>
          </div>
        </SwipeableViews>
    )
  }

  renderBrowser(){
    const { nodes } = this.props
    
    return (
      <div>
          <div className="row">
            <SensorCard id="A1" value={nodes[1]} />
            <SensorCard id="A2" value={nodes[2]} />
            <SensorCard id="A3" value={nodes[3]} />
            <SensorCard id="A4" value={nodes[4]} />
            <SensorCard id="B1" value={nodes[5]} />
            <SensorCard id="B2" value={nodes[6]} />
            <SensorCard id="B3" value={nodes[7]} />
            <SensorCard id="B4" value={nodes[8]} />
          </div>
        </div>
    )
  }
  render() {
    return (
    <div>
      <div className="utils__title utils__title--flat mb-3">
        <span className="text-uppercase font-size-16"> Plant List </span>
      </div>           
        <MobileView>
          {this.renderMobile()}
        </MobileView>
        <BrowserView>
          {this.renderBrowser()}
        </BrowserView>
    </div>
     
    )
  }
}

export default Plant
