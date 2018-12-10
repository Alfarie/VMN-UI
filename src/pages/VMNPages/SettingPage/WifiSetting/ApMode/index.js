import React from 'react';

import { Form, Input } from 'antd';

import {connect} from 'react-redux'
import {STARTAP_REDUCER, startAp} from 'ducks/wifi'

import RefreshButton from 'components/VMNComponents/RefreshButton'
const FormItem = Form.Item;

const mapStateToProps = (state) => ({
    loading: state.app.submitForms[STARTAP_REDUCER]
})
@connect(mapStateToProps)
class ApMode extends React.Component {
    state = { loading: false }
    onSubmit = (e)=>{
        e.preventDefault();
        const {form,dispatch} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                const {ssid, password} = values
                dispatch(startAp(ssid, password))
            }
        });
    }
    
    render(){
        const {getFieldDecorator} = this.props.form
        const { loading } = this.props;
        // console.log(this.props)
        return (
            <div className="card card--example" style={{marginTop: '20px'}}>
                    <Form onSubmit={this.onSubmit}>
                      <div className="card-body pb-0">
                            <FormItem label="SSID">
                                {
                                    getFieldDecorator('ssid',{
                                        rules: [{required: true, message: 'Please enter ssid!' }],
                                    })( <Input type="text" placeholder="SSID"></Input>)
                                }
                            </FormItem>
                            <FormItem label="Password">
                                {
                                    getFieldDecorator('password',{
                                        rules: [{required: true, message: 'Please enter ssid!' }],
                                    })( <Input type="password" placeholder="Password" />)
                                }
                            </FormItem>
                            <div className="d-flex justify-content-end">
                                <RefreshButton title="Create AP" type="primary" htmlType="submit" loading={(loading)?true:false} />
                            </div>
                      </div>
                    </Form>
                </div>
        )
    }
}

const WrappedApMode = Form.create({
    mapPropsToFields(props){
        return {
            ssid: Form.createFormField({
                value: 'VMN-Default'
            }),
            password: Form.createFormField({
                value: 'raspberry'
            }),
        }
    }
})(ApMode);
export default WrappedApMode