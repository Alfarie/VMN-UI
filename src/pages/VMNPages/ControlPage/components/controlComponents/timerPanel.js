import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, TimePicker, Button, InputNumber, Icon, Modal, Radio } from 'antd'
import { setControl, _setControl } from 'ducks/control'
import moment from 'moment'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import SelectPreset from 'pages/VMNPages/PresetPage/components/SelectPreset'

const FormItem = Form.Item

const format = 'HH:mm'

const makeid = () => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

class TimerPanel extends Component {
  state = {
    visible: false,
    listNumber: null,
    working: 0,
    apply: 99,
  }
  minToTime(min) {
    let hour = Math.floor(min / 60)
    let minutes = min % 60
    return (hour < 10 ? '0' : '') + hour + ':' + (minutes < 10 ? '0' : '') + minutes
  }

  timerList = () => {
    const { control, ch } = this.props
    const timerList = control[ch - 1].timer.list

    return timerList.map((timer, ind) => {
      const key = makeid()
      return (
        <li key={key} className="list-group-item">
          <div className="d-flex justify-content-between">
            <Icon style={{ fontSize: '16px', color: '#08c' }} type="clock-circle" />
            <span style={{ fontSize: '14px' }}>
              {this.minToTime(timer[0])} - {timer[1]} Sec.{' '}
            </span>
            <span>
              <Button
                type="primary"
                shape="circle"
                icon="tool"
                onClick={e => this.setState({ visible: true, listNumber: ind, working: +timer[1] })}
              />
              <Button
                style={{ marginLeft: '10px' }}
                type="danger"
                shape="circle"
                icon="delete"
                onClick={e => {
                  this.onDeleteTimer(ind)
                }}
              />
            </span>
          </div>
        </li>
      )
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)

        var { control, ch, dispatch } = this.props
        control[ch - 1].ch = ch
        control[ch - 1].timer.mode = 1
        control[ch - 1].mode = 1
        dispatch(_setControl(control, ch))
        this.forceUpdate()
      }
    })
  }

  onAddTimer = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // {time: Moment, sec: 120, timerList: undefined}
        const time = values.time.hour() * 60 + values.time.minute()
        var { control, ch, dispatch } = this.props
        control[ch - 1].timer.list.push([time, values.sec])
        control[ch - 1].timer.list.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
        dispatch(setControl(control, ch))
        this.forceUpdate()
      }
    })
  }

  onPresetSelect = val => {
    const { preset, control, ch, dispatch } = this.props
    control[ch - 1].timer.list = preset[val - 1].data.timer.list
    dispatch(setControl(control, ch))
    this.forceUpdate()
  }

  onDeleteTimer = ind => {
    var { control, ch, dispatch } = this.props
    control[ch - 1].timer.list.splice(ind, 1)
    dispatch(setControl(control, ch))
    this.forceUpdate()
  }
  render() {
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Modal
          title="Working (s)"
          visible={this.state.visible}
          onOk={() => {
            const { control, ch, dispatch } = this.props
            const { listNumber, working } = this.state

            switch (this.state.apply) {
              case 1:
                control[ch - 1].timer.list[listNumber][1] = working
                break

              case 99:
                const { list } = control[ch - 1].timer
                control[ch - 1].timer.list = list.map(([timer, _working], index) =>
                  index >= listNumber ? [timer, working] : [timer, _working],
                )
                break
            }

            dispatch(setControl(control, ch))
            this.setState({ visible: false })
            this.forceUpdate()
          }}
          onCancel={() => this.setState({ visible: false })}
          centered={true}
        >
          <FormItem>
            <Radio.Group
              onChange={({ target }) => {
                this.setState({ apply: target.value })
              }}
              value={this.state.apply}
            >
              <Radio value={1}>Apply One</Radio>
              <Radio value={99}>Apply from now</Radio>
            </Radio.Group>
            <InputNumber
              onChange={value => this.setState({ working: value })}
              min={1}
              max={1000}
              value={this.state.working}
              style={{ width: '100%' }}
            />
          </FormItem>
        </Modal>

        <div className="card">
          <div className="card-header">
            <h5 className="text-black">
              <strong className="text-capitalize">Timer Panel</strong>
            </h5>
          </div>
          <div className="card-body">
            <Form onSubmit={this.onAddTimer}>
              <div>
                <SelectPreset onPresetSelect={this.onPresetSelect} />
              </div>
              <div className="d-flex justify-content-around" style={{ marginTop: '15px' }}>
                <FormItem>{getFieldDecorator('time')(<TimePicker format="HH:mm" />)}</FormItem>

                <FormItem>{getFieldDecorator('sec')(<InputNumber min={1} max={1000} />)}</FormItem>

                <Button
                  type="primary"
                  icon="download"
                  htmlType="submit"
                  style={{ marginTop: '5px' }}
                >
                  Add
                </Button>
              </div>
            </Form>

            <ul className="list-group">{this.timerList()}</ul>
            <Form onSubmit={this.onSubmit}>
              <div className="d-flex justify-content-end">
                <RefreshButton
                  htmlType="submit"
                  title="Submit"
                  type="primary"
                  loading={loading ? true : false}
                />
              </div>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const ch = state.control.selectedChannel
  return {
    ch,
    control: state.control.control,
    loading: state.app.submitForms['control'],
    preset: state.preset,
  }
}
const WrappedTimerPanel = Form.create({
  mapPropsToFields(props) {
    var config = {
      output: Form.createFormField({ value: props.output ? true : false }),
      time: Form.createFormField({ value: moment() }),
      sec: Form.createFormField({ value: 120 }),
    }
    return config
  },
})(TimerPanel)
export default connect(mapStateToProps)(WrappedTimerPanel)
