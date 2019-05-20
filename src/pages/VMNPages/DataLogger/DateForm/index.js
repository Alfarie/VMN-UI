import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, DatePicker, Select, Button } from 'antd'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import moment from 'moment'
import { getLog, setLoggerPageSensor } from 'ducks/logger'
const FormItem = Form.Item
const Option = Select.Option

const mapStateToProps = state => ({})
@connect(mapStateToProps)
export class DateForm extends Component {
  onSubmit = e => {
    e.preventDefault()
    const { validateFields } = this.props.form
    const { dispatch } = this.props
    validateFields((err, values) => {
      const { start, end, interval, station, sensor } = values
      // console.log(start,end,interval,station)
      dispatch(getLog({ start, end, interval, station }))
      dispatch(setLoggerPageSensor(sensor))
    })
  }

  openNewTabCsv = e => {
    // e.preventDefault();
    // console.log('open new tab')
    const { validateFields } = this.props.form
    const { dispatch } = this.props
    validateFields((err, values) => {
      const { start, end, interval, station, sensor } = values
      const startStr = start.format('YYYY-MM-DD')
      const endStr = end.format('YYYY-MM-DD')
      const link = `http://${
        window.location.hostname
      }:3000/vmn-logger/interval/csv?interval=${interval}&start=${startStr}&end=${endStr}&station=${station}`
      window.open(link, '_blank')
    })
  }

  getStations = () => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(val => (
      <Option value={val} key={`sta${val}`}>
        {val}
      </Option>
    ))
  }

  getIntervals = () => {
    return [1, 5, 15, 30].map(val => (
      <Option value={val} key={`intv${val}`}>
        {val} minute
      </Option>
    ))
  }

  render() {
    const { loading } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className="row">
        <div className="col col-xs-12 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="text-black">
                <strong className="text-capitalize">Date Time Setting</strong>
              </h5>
            </div>
            <div className="card-body">
              <Form onSubmit={this.onSubmit}>
                <div className="d-flex justify-content-around">
                  <FormItem label="Time">
                    {getFieldDecorator('start')(<DatePicker format="LL" />)}
                  </FormItem>
                  <FormItem label="Time">
                    {getFieldDecorator('end')(<DatePicker format="LL" />)}
                  </FormItem>
                </div>
                <FormItem label="Sensor">
                  {getFieldDecorator('sensor', {
                    rules: [{ required: true, message: 'Please enter ssid!' }],
                  })(
                    <Select>
                      <Option value="ec">Conductivity</Option>
                      <Option value="volume">Volume</Option>
                    </Select>,
                  )}
                </FormItem>
                <FormItem label="station">
                  {getFieldDecorator('station', {
                    rules: [{ required: true, message: 'Please enter ssid!' }],
                  })(<Select>{this.getStations()}</Select>)}
                </FormItem>

                <FormItem label="interval">
                  {getFieldDecorator('interval', {
                    rules: [{ required: true, message: 'Please enter ssid!' }],
                  })(<Select>{this.getIntervals()}</Select>)}
                </FormItem>
                <div className="d-flex justify-content-end">
                  <Button onClick={this.openNewTabCsv} style={{ margin: '5px' }} icon="download">
                    .CSV
                  </Button>

                  <RefreshButton htmlType="submit" title="Submit" type="primary" loading={false} />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedDateForm = Form.create({
  mapPropsToFields(props) {
    return {
      start: Form.createFormField({ value: moment() }),
      end: Form.createFormField({ value: moment() }),
      sensor: Form.createFormField({ value: 'ec' }),
      station: Form.createFormField({ value: 0 }),
      interval: Form.createFormField({ value: 1 }),
    }
  },
})(DateForm)
export default WrappedDateForm
