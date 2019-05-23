import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Button, Icon, Select, InputNumber, Form, TimePicker, Input } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RefreshButton from 'components/VMNComponents/RefreshButton'

import { getPreset } from 'ducks/preset'
import moment from 'moment'
import SelectPreset from './components/SelectPreset'
import ShowPreset from './components/ShowPreset'
const Option = Select.Option

@connect()
class PresetPage extends React.Component {
  state = { currentPreset: undefined }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getPreset())
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <h5 className="text-black">
              <strong className="text-capitalize">Preset</strong>
            </h5>
          </div>
          <div className="card-body">
            <SelectPreset
              manage={true}
              onPresetSelect={val => {
                this.setState({ currentPreset: val })
              }}
            />
          </div>
        </div>

        {this.state.currentPreset !== undefined ? (
          <ShowPreset currentPreset={this.state.currentPreset} />
        ) : null}
      </div>
    )
  }
}
export default PresetPage
