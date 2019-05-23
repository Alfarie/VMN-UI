import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
import { connect } from 'react-redux'
import { setPreset,_setPreset } from 'ducks/preset';
const Option = Select.Option;

const presetModel = {
    "data": {
        "ch": 1,
        "mode": 0,
        "sensor": 0,
        "manual": {
            "status": 0
        },
        "timer": {
            "size": 3,
            "mode": 0,
            "list": [
                [120, 120],
                [1045, 120]
            ]
        },
        "irrigation": {
            "soil_upper": 60,
            "soil_lower": 40,
            "soil_detecting": 30,
            "soil_working": 15,
            "par_soil_setpoint": 50,
            "par_detecting": 30,
            "par_working": 15,
            "par_acc": 1.5,
            "mode": 1,
            "limit_time": 3,
            "descent_rate": 0.2
        },
        "dfirrigation": {
            "upper": 60,
            "lower": 40,
            "paracc": 1,
            "working": 15,
            "descent": 50
        },
        "advcond": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "setpoint": 600,
            "working": 15,
            "detecting": 30,
            "direction": 0
        },
        "advsb": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "direction": 0
        },
        "advsbt": {
            "timer_list": [],
            "timer_size": 0,
            "timer_flag": false,
            "sensor_condition": 3,
            "sensor_setpoint": 30,
            "sensor_flag": false,
            "sensor_direction": 0,
            "sensor": 5,
            "upper": 2000,
            "lower": 1500,
            "working": 10,
            "detecting": 10,
            "direction": 0
        }
    },
    "name": "New Preset"
}

const mapStateToProps = (state, props) => {
    return {
        preset: state.preset
    }
}
@connect(mapStateToProps)
class SelectPreset extends Component {
    state = { presetNumber: undefined }
    renderOptions = () => {
        const { preset } = this.props
        return preset.map((val, ind) => {
            return (<Option key={`chind${ind}`} value={ind + 1}>{val.name}</Option>)
        })
    }

    onSelectPresetChange = (val) => {
        this.setState({ presetNumber: val })
        this.props.onPresetSelect(val);
    }

    onNewPreset = () => {
        const { dispatch, preset } = this.props;
        let newPreset = JSON.parse(JSON.stringify(preset));
        newPreset.push(presetModel);
        dispatch(setPreset(newPreset));
        this.onSelectPresetChange(newPreset.length);
        this.setState({ presetNumber: newPreset.length })
    }

    onDeletePreset = () => {
        const { dispatch, preset } = this.props;
        let newPreset = JSON.parse(JSON.stringify(preset));
        newPreset.splice(this.state.presetNumber - 1, 1);
        dispatch(setPreset(newPreset));
        this.onSelectPresetChange(undefined);
        this.setState({ presetNumber: undefined })
        dispatch(_setPreset(newPreset));
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select Preset"
                    optionFilterProp="children"
                    onChange={this.onSelectPresetChange}
                    value={this.state.presetNumber}
                >
                    {this.renderOptions()}
                </Select>
                {
                    (this.props.manage) ? (
                        <div className="d-flex flex-row-reverse p-3">
                            <div className="p-2"><Button type="primary" icon="plus-circle" onClick={this.onNewPreset}>New</Button></div>
                            <div className="p-2">
                                <Button type="danger" icon="delete"
                                    disabled={this.state.presetNumber ? false : true}
                                    onClick={this.onDeletePreset}
                                >Delete</Button>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

const WrappedSelectPreset = Form.create({
    mapPropsToFields(props) {
        return {
            ch: Form.createFormField({ value: 1 })
        }
    }
})(SelectPreset);
export default WrappedSelectPreset
