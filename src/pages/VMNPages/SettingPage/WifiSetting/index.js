import React from 'react'
import ApMode from './ApMode'
import StationMode from './StationMode'
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'
import { Radio } from 'antd';
import { connect } from 'react-redux'


const RadioGroup = Radio.Group;

const mapStateToProps = (state, props) => (state)

@connect(mapStateToProps)
class WifiSetting extends React.Component {
  state = {
    value: 1,
  };

  onChange = (e) => {
    // console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });

    if(e.target.value === 1){
      this.props.dispatch(push('/setting/wifi/station'))
    }
    else {
      this.props.dispatch(push('/setting/wifi/accesspoint'))
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div className="row">
          <div className="col col-xs-12 col-lg-6">
            <div className="card">
                <div className="card-header">
                    <h5 className="text-black">
                        <strong className="text-capitalize">
                            Wi-Fi
                        </strong>
                    </h5>
                </div>
                <div className="card-body">
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>Station</Radio>
                    <Radio value={2}>Access Point</Radio>
                  </RadioGroup>

                  <Route path="/setting/wifi/accesspoint" component={ApMode} />
                  <Route path="/setting/wifi/station" component={StationMode} />
                  
                </div>
            </div>
          </div>
      </div>
    );
  }
}
export default WifiSetting