import React from 'react'
import { Form, TimePicker, DatePicker } from 'antd'
import moment from 'moment'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import { connect } from 'react-redux'
import { setDateTime } from 'ducks/vmn-operation'
const FormItem = Form.Item

const mapStateToProps = (state, props) => {
  return {
    loading: state.app.submitForms['datetime'],
  }
}
@connect(mapStateToProps)
class DateTimeSetting extends React.Component {
  onSubmit = e => {
    e.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const { date, time } = values
        const data = {
          date: date.format('YYYY-MM-DD'),
          time: time.format('HH:mm'),
        }
        dispatch(setDateTime(data))
      }
    })
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
                    {getFieldDecorator('time')(<TimePicker format="HH:mm" />)}
                  </FormItem>
                  <FormItem label="Time">
                    {getFieldDecorator('date')(<DatePicker format="LL" />)}
                  </FormItem>
                </div>
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
        </div>
      </div>
    )
  }
}

const WrappedDateTimeSetting = Form.create({
  mapPropsToFields(props) {
    return {
      date: Form.createFormField({ value: moment() }),
      time: Form.createFormField({ value: moment() }),
    }
  },
})(DateTimeSetting)
export default WrappedDateTimeSetting
