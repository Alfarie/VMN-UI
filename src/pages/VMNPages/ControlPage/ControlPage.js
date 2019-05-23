import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Button, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ChannelSelectPanel from './components/channelSelectPanel'
import ModeSelectPanel from './components/modeSelectPanel'
import TimerPanel from './components/controlComponents/timerPanel'
import ManualPanel from './components/controlComponents/manualPanel'
import { setSelectedChannel } from 'ducks/control'
import { push } from 'react-router-redux'
import { _getControl } from 'ducks/control'
import { getPreset } from 'ducks/preset'

const mapStateToProps = (state, props) => {
  return {
    control: state.control,
  }
}
@connect(mapStateToProps)
class ControlPage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(_getControl())
    dispatch(getPreset())
  }
  state = {
    selected: false,
    mode: 0,
  }

  onSelect = ch => {
    const { control, dispatch } = this.props
    this.onModeSelect(control.control[ch - 1].mode)
    this.props.dispatch(setSelectedChannel({ selectedChannel: +ch }))
    this.setState({ selected: true })
  }

  onModeSelect = mode => {
    const { dispatch } = this.props
    this.setState({ mode })
  }

  renderMode() {
    if (!this.state.selected) return null
    else if (this.state.mode === 1) return <TimerPanel />
    else if (this.state.mode === 0) return <ManualPanel />
    else return null
  }

  render() {
    const props = this.props
    const { control } = this.props
    return (
      <div>
        <ChannelSelectPanel onSelect={this.onSelect} />
        {this.state.selected ? <ModeSelectPanel onModeSelect={this.onModeSelect} /> : null}
        {this.renderMode()}
      </div>
    )
  }
}

export default ControlPage
