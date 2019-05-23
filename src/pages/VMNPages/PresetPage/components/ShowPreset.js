import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Button, Icon, Select, InputNumber, Form, TimePicker, Input } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import { setPreset, _setPreset } from 'ducks/preset'

import moment from 'moment'
const Option = Select.Option

const makeid = () => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const mapStateToProps = (state, props) => {
  return {
    preset: state.preset,
    loading: state.app.submitForms['preset'],
  }
}

class ShowPreset extends React.Component {
  state = { sec: 120, time: moment() }

  onHandleSubmit = e => {
    e.preventDefault()
    const { dispatch, preset, currentPreset, form } = this.props
    const newPreset = JSON.parse(JSON.stringify(preset))
    form.validateFields((err, values) => {
      if (!err) {
        newPreset[currentPreset - 1].name = values.name
        dispatch(setPreset(newPreset))
        dispatch(_setPreset())
      }
    })
  }

  timerList() {
    const { preset, currentPreset } = this.props
    const timerList = preset[currentPreset - 1].data.timer.list
    return timerList.map((timer, ind) => {
      const key = makeid()
      return (
        <li key={key} className="list-group-item">
          <div className="d-flex justify-content-between">
            <Icon style={{ fontSize: '16px', color: '#08c' }} type="clock-circle" />
            <span style={{ fontSize: '14px' }}>
              {this.minToTime(timer[0])} - {timer[1]} Sec.{' '}
            </span>
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              onClick={e => {
                this.deleteTime(ind)
              }}
            />
          </div>
        </li>
      )
    })
  }

  minToTime = min => {
    const hour = Math.floor(min / 60)
    const minutes = min % 60
    return (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes
  }

  addTimer = () => {
    const { currentPreset, dispatch, preset, form } = this.props
    const { sec, time } = this.state
    if (!sec || !time) {
      console.log('data is undefined')
      return
    }
    console.log(currentPreset, sec, time.toString(), preset[currentPreset - 1])
    const timeMin = time.hour() * 60 + time.minute()
    const newPreset = JSON.parse(JSON.stringify(preset))
    newPreset[currentPreset - 1].data.timer.list.push([timeMin, sec])
    newPreset[currentPreset - 1].data.timer.list.sort((a, b) =>
      a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0,
    )

    form.validateFields((err, values) => {
      if (!err) {
        newPreset[currentPreset - 1].name = values.name
        dispatch(setPreset(newPreset))
      }
    })
  }

  deleteTime = ind => {
    const { currentPreset, dispatch, preset, form } = this.props
    const newPreset = JSON.parse(JSON.stringify(preset))
    newPreset[currentPreset - 1].data.timer.list.splice(ind, 1)
    newPreset[currentPreset - 1].data.timer.list.sort((a, b) =>
      a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0,
    )
    form.validateFields((err, values) => {
      if (!err) {
        newPreset[currentPreset - 1].name = values.name
        dispatch(setPreset(newPreset))
      }
    })
  }
  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form
    const { loading } = this.props

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }

    return (
      <div className="card">
        <div className="card-header">
          <h5 className="text-black">
            <strong className="text-capitalize">Show Preset</strong>
          </h5>
        </div>
        <div className="card-body">
          <Form onSubmit={this.onHandleSubmit}>
            <Form.Item label="Preset" style={{ marginRight: '10px' }}>
              {getFieldDecorator('name')(<Input />)}
            </Form.Item>
            <div className="d-flex flex-row" style={{ marginBottom: '25px' }}>
              <div style={{ marginRight: '10px' }}>
                <TimePicker
                  format="HH:mm"
                  value={this.state.time}
                  onChange={val => {
                    this.setState({ time: val })
                  }}
                />
              </div>
              <div style={{ marginRight: '10px' }}>
                <InputNumber
                  min={1}
                  max={1000}
                  value={this.state.sec}
                  onChange={val => {
                    this.setState({ sec: val })
                  }}
                />
              </div>
              <Button
                type="primary"
                icon="download"
                htmlType="button"
                style={{ marginRight: '10px' }}
                onClick={this.addTimer}
              >
                Add
              </Button>
            </div>

            <ul className="list-group">{this.timerList()}</ul>

            <div className="d-flex flex-row-reverse p-2">
              <div className="p-2">
                <RefreshButton
                  htmlType="submit"
                  title="Submit"
                  type="primary"
                  loading={loading ? true : false}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedShowPreset = Form.create({
  mapPropsToFields(props) {
    return {
      working: Form.createFormField({ value: 120 }),
      ch: Form.createFormField({ value: 1 }),
      sec: Form.createFormField({ value: 120 }),
      time: Form.createFormField({ value: moment() }),
      name: Form.createFormField({ value: props.preset[props.currentPreset - 1].name }),
    }
  },
})(ShowPreset)
export default connect(mapStateToProps)(WrappedShowPreset)
