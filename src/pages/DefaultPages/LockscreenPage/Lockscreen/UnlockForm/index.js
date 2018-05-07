import React from 'react'
import { Form, Icon, Input } from 'antd'

const FormItem = Form.Item

@Form.create()
class UnlockForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>
        <div className="form-actions text-center">
          <button type="submit" className="btn btn-success">
            Unlock
          </button>
        </div>
        <div className="text-center">
          <a href="javascript: void(0);" className="text-default">
            Or sign in as a different user
          </a>
        </div>
      </Form>
    )
  }
}

export default UnlockForm
