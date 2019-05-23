import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Button, Icon, Select, InputNumber, Form } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import { _setTask } from 'ducks/control'
const Option = Select.Option

const mapStateToProps = (state, props) => {
  return {
    control: state.control,
  }
}
@connect(mapStateToProps)
class ControlPage extends React.Component {
  onHandleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }

  renderOptions = () => {
    return [...Array(4).keys()].map((ctrl, ind) => (
      <Option key={`chind${ind}`} value={ind + 1}>
        Channel {ind + 1}
      </Option>
    ))
  }
  render() {
    const props = this.props
    const { control } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="text-black">
            <strong className="text-capitalize">Task Panel</strong>
          </h5>
        </div>
        <div className="card-body">
          <Form onSubmit={this.onHandleSubmit}>
            <Form.Item label="Working">
              {getFieldDecorator('ch')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Channel."
                  optionFilterProp="children"
                  onChange={this.handleChange}
                >
                  {this.renderOptions()}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Working">
              {getFieldDecorator('working')(<InputNumber style={{ width: '100%' }} />)}
            </Form.Item>

            <div className="d-flex flex-row-reverse">
              <RefreshButton htmlType="submit" title="Add Task" type="primary" loading={false} />
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedControlPage = Form.create({
  mapPropsToFields(props) {
    return {
      working: Form.createFormField({ value: 120 }),
      ch: Form.createFormField({ value: 1 }),
    }
  },
})(ControlPage)
export default WrappedControlPage
