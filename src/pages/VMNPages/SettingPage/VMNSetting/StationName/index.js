import React from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Input, Icon } from 'antd'
import RefreshButton from 'components/VMNComponents/RefreshButton'
const FormItem = Form.Item

const mapStateToProps = state => {
  return {
    loading: state.app.submitForms['operation'],
  }
}
const label = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
@connect(mapStateToProps)
class StationName extends React.Component {
  getFields() {
    const count = 8
    const { getFieldDecorator } = this.props.form
    const children = []
    for (let i = 0; i < count; i++) {
      const rowName = i < 4 ? `A${i + 1}` : `B${i - 3}`
      children.push(
        <Col span={12} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={`${label[i]}`}>
            {getFieldDecorator(`NOD${i}`)(
              <Input
                maxLength={10}
                prefix={<Icon type="api" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Station Name"
              />,
            )}
          </FormItem>
        </Col>,
      )
    }
    return children
  }
  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.values(values)
        this.props.onSubmit({ 'station-name': data })
      }
    })
  }
  render() {
    const { loading } = this.props
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="text-black">
            <strong className="text-capitalize">Station Name</strong>
          </h5>
        </div>
        <div className="card-body">
          <Form className="ant-advanced-search-form" onSubmit={this.onSubmit}>
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <RefreshButton
                  htmlType="submit"
                  title="Submit"
                  type="primary"
                  loading={loading ? true : false}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedStationName = Form.create({
  mapPropsToFields(props) {
    var config = {}
    if (props.data === undefined) return config
    props.data.forEach((val, ind) => {
      config = {
        ...config,
        [`NOD${ind}`]: Form.createFormField({ value: val }),
      }
    })
    return config
  },
})(StationName)
export default WrappedStationName
