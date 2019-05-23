import React, { Component } from 'react'
import { Select, Button } from 'antd';
import { connect } from 'react-redux'
import { _getControl } from 'ducks/control'
const Option = Select.Option;


const mapStateToProps = (state) => {
    return {
        control: state.control.control.map(ctrl => ctrl.mode)
    }
}
@connect(mapStateToProps)
export default class channelSelectPanel extends Component {
    handleChange = (value) => {
        this.props.onSelect(value);
    }

    renderOptions = () => {
        const { control } = this.props
        return control.map((ctrl, ind) => (<Option key={`chind${ind}`} value={ind + 1}>Channel {ind + 1}: {ctrl === 1 ? 'Timer' : 'Manual'}</Option>))
    }

    onRefreshControl = ()=>{
        this.props.dispatch(_getControl());
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="text-black">
                        <strong className="text-capitalize">
                            Control Panel 
                            <Button type="default" shape="circle" size="small" icon="sync" style={{marginLeft: '10px'}} onClick={this.onRefreshControl}/>
                        </strong>
                    </h5>
                </div>
                <div className="card-body">
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Select Channel."
                        optionFilterProp="children"
                        onChange={this.handleChange}
                    >
                        {this.renderOptions()}
                    </Select>

                </div>
            </div>
        )
    }
}
