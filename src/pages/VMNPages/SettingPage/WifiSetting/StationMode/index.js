import React from 'react';
import { Form, Input, Select } from 'antd';
import {connect} from 'react-redux'
import { getWifi, STARTSTA_REDUCER, startSta,REFRESH_WIFI_REDUCER } from 'ducks/wifi'
import RefreshButton from 'components/VMNComponents/RefreshButton'
const FormItem = Form.Item;
const Option = Select.Option;

const mapStateToProps = (state,props)=>(
    {
        wifiList: state.wifi.wifiList,
        connectLoding: state.app.submitForms[STARTSTA_REDUCER],
        refreshLoding: state.app.submitForms[REFRESH_WIFI_REDUCER],
    }
)
@connect(mapStateToProps)
class ApMode extends React.Component {

    onSubmit = (e)=>{
        e.preventDefault();
        const { form,dispatch } = this.props;
        form.validateFields((err,values)=>{
            if(!err){
                const { ssid, password } = values
                dispatch(startSta(ssid,password));
            }
        })
    }
    
    componentWillMount(){
        this.refreshWifi()
    }

    listWifis = ()=>{
        const { wifiList } = this.props;
        return wifiList.map( wifi => (
            <Option value={wifi.ssid} key={wifi.ssid}>{wifi.ssid} ({wifi.quality}%)</Option>
        ))
    }

    refreshWifi = ()=>{
        const { dispatch } = this.props
        dispatch(getWifi())
    }

    render(){
        const { getFieldDecorator }  = this.props.form
        const { connectLoding, refreshLoding } = this.props;
        return (
                <div className="card card--example" style={{marginTop: '20px'}}>
                    <Form onSubmit={this.onSubmit}>
                        <div className="card-body pb-0">
                            <FormItem label="Wi-Fi">
                            {
                                getFieldDecorator('ssid',{
                                    rules: [{required: true, message: 'Please enter ssid!' }],
                                })(
                                    <Select>
                                        {this.listWifis()}
                                    </Select>
                                )
                            }   
                            </FormItem>
                            <FormItem label="Password">
                            {
                                getFieldDecorator('password',{
                                    rules: [{required: true, message: 'Please enter password!' }],
                                })(<Input type="password" placeholder="Password" />)
                            }
                            </FormItem>
                            <div className="d-flex justify-content-between">
                                <RefreshButton type="default" title="Refresh Wi-Fi" loading={refreshLoding?true:false} onSubmit={this.refreshWifi} />
                                <RefreshButton type="primary" title="connect" htmlType="submit" loading={(connectLoding)?true:false}/>
                            </div>
                        </div>
                    </Form>
                </div>
        )
    }
}

const WrappedApMode = Form.create({

})(ApMode)
export default WrappedApMode