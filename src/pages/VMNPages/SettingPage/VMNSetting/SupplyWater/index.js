import React from 'react';

import {connect } from 'react-redux'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import { Form, Row, Col, InputNumber, Button, Icon } from 'antd';
const FormItem = Form.Item;


// import {connect } from 'react-redux'
// import RefreshButton from 'components/VMNComponents/RefreshButton'
// <RefreshButton htmlType="submit" title="Submit" type="primary" loading={loading ? true : false} />
const mapStateToProps = (state) => {
    return {
        loading: state.app.submitForms['operation']
    }
}


@connect(mapStateToProps)
class SupplyWaterInput extends React.Component {
   

    getFields() {
        const count = 4;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < count; i++) {
            const rowName = `Channel ${i+1}:`
          children.push(
            <Col span={6} key={i} style={{ display: i < count ? 'block' : 'none' }}>
              <FormItem label={`${rowName}`}>
                {getFieldDecorator(`WFOD${i}`)(
                  <InputNumber placeholder="Number of plant" type="number"/>
                )}
              </FormItem>
            </Col>
          );
        }
        return children;
      }

      onSubmit = (e)=>{
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if (!err) {
              const data = Object.values(values);
              this.props.onSubmit({'supply-water': data})
            }
          });
      }
    render(){

        const { data, loading } = this.props
        return (
            <div className="card">
                <div className="card-header">
                <h5 className="text-black">
                    <strong>
                        Supply Water (mL)
                    </strong>
                </h5>
                </div>
                <div className="card-body">
                    <Form
                        className="ant-advanced-search-form"
                        onSubmit={this.onSubmit}
                    >
                        <Row gutter={24}>{this.getFields()}</Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'right' }}>
                                <RefreshButton htmlType="submit" title="Submit" type="primary" loading={loading ? true : false} />
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            
        )
    }
}

const wrappedSupplyWaterInput = Form.create({
    mapPropsToFields(props) {
        var config = {}
        props.data.forEach( (val,ind) => {
            config = {
                ...config, 
                [`WFOD${ind}`]:Form.createFormField({value: val,})
            }
        })
        return config
    }
})(SupplyWaterInput);
export default wrappedSupplyWaterInput