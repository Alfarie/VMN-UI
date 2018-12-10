import React from 'react'
import { Form, Select, Input, Button, Icon } from 'antd';
import {connect} from 'react-redux'
import { TimePicker } from 'antd';
import moment from 'moment';

import RefreshButton from 'components/VMNComponents/RefreshButton'
const format = 'HH:mm';

const FormItem = Form.Item;
const Option = Select.Option;

const mapStateToProps = (state) => {
  return{
    loading: state.app.submitForms['operation']
  }
}

@connect(mapStateToProps)
class OperationSetting extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const submitData = {
          'operator-name': values.operator,
          'crop-name': values.cropname,
          'measurement-time': [
            values.measurementStart.format("HH:mm"),
            values.measurementStop.format("HH:mm")
          ]
        }
        onSubmit({operation: submitData})
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="text-black">
            <strong className="text-capitalize">
              Operation Setting
            </strong>
          </h5>
        </div>
        <div className="card-body">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Operator Name">
            {getFieldDecorator('operator', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            label="Crop Name">
            {getFieldDecorator('cropname', {
              rules: [{ required: true, message: 'Please input crop name!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Measurement Time zone:">
            <div>
              {getFieldDecorator('measurementStart',config)(<TimePicker format={format} />)}
                <i className="icmn icmn-arrow-right2"/>
              {getFieldDecorator('measurementStop',config)(<TimePicker format={format} />)}
            </div>
          </FormItem>
          <FormItem>
           
          </FormItem>
          <FormItem>
            <div className="d-flex justify-content-end">
              <RefreshButton htmlType="submit" title="Submit" type="primary" loading={loading ? true : false} />
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}
            </div>
          </FormItem>
        </Form>
        </div>
      </div>
    );
  }
}

const wrappedOperationSetting = Form.create(
  {
    mapPropsToFields(props) {
      const operation = props.data
      const measurementTime = operation['measurement-time']
      const start = measurementTime[0].split(":").map(Number)
      const stop = measurementTime[1].split(":").map(Number)
      return {
        operator: Form.createFormField({
          value: props.data['operator-name'],
        }),
        cropname: Form.createFormField({
          value: props.data['crop-name'],
        }),
        measurementStart: Form.createFormField({
          value: moment().hour(start[0]).minute(start[1]),
        }),
        measurementStop: Form.createFormField({
          value: moment().hour(stop[0]).minute(stop[1]),
        }),
      };
    },
  }
)(OperationSetting);
export default wrappedOperationSetting