import React, { Component } from 'react'
import { Switch, Form } from 'antd';
import { connect } from 'react-redux'
import { _setControl } from 'ducks/control'
import RefreshButton from 'components/VMNComponents/RefreshButton'
const FormItem = Form.Item;




class ManualPanel extends Component {


    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const val = values.output;
                var { control, ch, dispatch } = this.props
                control[ch - 1].ch = ch;
                control[ch - 1].mode = 0;
                control[ch - 1].manual.status = val ? 1 : 0
                dispatch(_setControl(control, ch));
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading } = this.props
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="text-black">
                        <strong className="text-capitalize">Manual Panel</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <Form onSubmit={this.onSubmit}>
                        <FormItem>
                            <div className="d-flex justify-content-around">
                                <label>Output Status </label>
                                {getFieldDecorator('output', { valuePropName: 'checked' })(
                                    <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                                )}
                            </div>
                        </FormItem>
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
        )
    }
}


const mapStateToProps = (state) => {
    const ch = state.control.selectedChannel
    return {
        ch,
        output: state.control.control[ch - 1].manual.status,
        control: state.control.control,
        loading: state.app.submitForms['control']
    }
}
const WrappedManualPanel = Form.create({
    mapPropsToFields(props) {
        var config = {
            output: Form.createFormField({ value: props.output ? true : false }),
        }
        return config
    },
})(ManualPanel)
export default connect(mapStateToProps)(WrappedManualPanel)

