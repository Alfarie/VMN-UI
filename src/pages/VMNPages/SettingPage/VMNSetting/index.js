import React from 'react'
import OperationSetting from './OperationSetting'
import NumberOfPlant from './NumberOfPlant'
import NumberOfDrippers from './NumberOfDrippers'
import WaterFlowOfDrippers from './WaterFlowOfDrippers'
import StationName from './StationName'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux'
import { _setOperation, getOperation } from 'ducks/vmn-operation'
import { BrowserView, MobileView } from 'react-device-detect'
const mapStateToProps = (state, props) => ({
  operation: state.operation,
})
@connect(mapStateToProps)
class VMNSetting extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getOperation())
  }

  onSubmit = values => {
    const { dispatch } = this.props
    dispatch(_setOperation(values))
  }

  renderMobile() {
    const { operation } = this.props
    return (
      <SwipeableViews>
        <OperationSetting data={operation['operation']} onSubmit={this.onSubmit} />
        <StationName data={operation['station-name']} onSubmit={this.onSubmit} />
        <WaterFlowOfDrippers data={operation['water-flow']} onSubmit={this.onSubmit} />
        <NumberOfPlant data={operation['number-plant']} onSubmit={this.onSubmit} />
        <NumberOfDrippers data={operation['number-drippers']} onSubmit={this.onSubmit} />
      </SwipeableViews>
    )
  }
  renderBrowswer() {
    const { operation } = this.props
    return (
      <div className="row">
        <div className="col col-lg-6 col-xs-12">
          <OperationSetting data={operation['operation']} onSubmit={this.onSubmit} />
        </div><div className="col col-lg-6 col-xs-12">
          <StationName data={operation['station-name']} onSubmit={this.onSubmit} />
        </div>
        <div className="col col-lg-6 col-xs-12">
          <NumberOfPlant data={operation['number-plant']} onSubmit={this.onSubmit} />
        </div>
        <div className="col col-lg-6 col-xs-12">
          <NumberOfDrippers data={operation['number-drippers']} onSubmit={this.onSubmit} />
        </div>
        <div className="col col-lg-6 col-xs-12">
          <WaterFlowOfDrippers data={operation['water-flow']} onSubmit={this.onSubmit} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <MobileView>{this.renderMobile()}</MobileView>
        <BrowserView>{this.renderBrowswer()}</BrowserView>
      </div>
    )
  }
}
export default VMNSetting
