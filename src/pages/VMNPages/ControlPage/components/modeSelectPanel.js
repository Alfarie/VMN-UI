import React, { Component } from 'react'
import { Switch, Form, Radio } from 'antd';
import { connect } from 'react-redux'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;



const mapStateToProps = (state) => {
    const { control, selectedChannel } = state.control;
    return {
        mode: control[selectedChannel - 1].mode,
        ch: selectedChannel
    }
}
// @connect(mapStateToProps)
class modeSelectPanel extends Component {

    render() {
        const { mode,ch,onModeSelect } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="text-black">
                        <strong className="text-capitalize">Mode Selection: {ch}</strong>
                    </h5>
                </div>
                <div className="card-body">
                    <Form>
                        <div className="d-flex justify-content-around">

                            <FormItem>
                                {getFieldDecorator('mode')(
                                    <RadioGroup onChange={ (e)=>onModeSelect(e.target.value)}>
                                        <Radio value={0}>Manual</Radio>
                                        <Radio value={1}>Timer</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedModeSelectPanel = Form.create({
    mapPropsToFields(props) {

        var config = {
            mode: Form.createFormField({ value: props.mode }),
        }
        return config
    },
})(modeSelectPanel)
export default connect(mapStateToProps)(WrappedModeSelectPanel)
