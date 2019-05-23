import React, { Component } from 'react'
import RefreshButton from 'components/VMNComponents/RefreshButton'
import { Form, Table, Divider, Tag } from 'antd'
import { _getControl } from 'ducks/control'
import { connect } from 'react-redux'
import { getSummary } from 'ducks/logger'
import { supplyCalculation } from 'ducks/vmn-operation'

import moment from 'moment'
const mapStateToProps = (state, props) => {
    const { control } = state.control
    const { datetime } = state.realTime
    return {
        loading: state.app.submitForms['get-summary'],
        measurement: state.operation.operation['measurement-time'],
        summary: state.logger.summary,
        currentSupply: state.operation.currentSupply
    }
}
@connect(mapStateToProps)
class SummaryPage extends Component {
    state = { currentConsume: [0,0,0,0,0,0,0,0], totalConsume: [1,1,1,1,1,1,1,1,1] }
    onSubmit = (e) => {
        e.preventDefault()
        const { form, dispatch, measurement } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                let start = moment().format('YYYY-MM-DD') + " " + measurement[0] + ":00"
                let stop = moment().format('YYYY-MM-DD') + " " + measurement[1] + ":00"
                dispatch(getSummary(start, stop))
                dispatch(supplyCalculation());
            }
        });
    }

    

    render() {
        const { loading, summary, measurement,currentSupply } = this.props;
        // volStart(pin): 320
        // volStop(pin): 760
        // volDiff(pin): 440
        const columns = [{
            title: 'STA',
            dataIndex: 'station',
            key: 'station',
        },
        {
            title: 'Start Volume',
            dataIndex: 'volStart',
            key: 'volStart',
        },
        {
            title: 'End Volume',
            dataIndex: 'volStop',
            key: 'volStop',
        },
        {
            title: 'Total drain',
            dataIndex: 'volDiff',
            key: 'volDiff',
        },
        {
            title: 'Supply',
            dataIndex: 'supply',
            key: 'supply',
        }]

        const sta = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']

        let data = summary.map((node, ind) => ({
            volDiff: node.volDiff + 'ml',
            volStart: node.volStart + 'ml',
            volStop: node.volStop + 'ml',
            station: sta[ind],
            supply: (currentSupply[ind]).toFixed(0) + 'ml',
            key: ind
        }));

        return (
            <div className="row">
                <div className="col col-xs-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="text-black">
                                <strong className="text-capitalize">Summary</strong>
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center">
                            <Form onSubmit={this.onSubmit}>
                                    <RefreshButton
                                        htmlType="submit"
                                        title="Get Summary"
                                        type="primary"
                                        loading={loading ? true : false}
                                    />
                                </Form>
                            </div>
                            <div>
                                <h5>Date: {moment().format('LL')}</h5>
                                <h5>Measurement time: {measurement[0]} - {measurement[1]}</h5>
                                <Table columns={columns} dataSource={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Form.create()(SummaryPage)