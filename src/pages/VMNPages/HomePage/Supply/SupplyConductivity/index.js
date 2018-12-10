import React from 'react';
import ChartCard from '../../../../../components/CleanComponents/ChartCard'
import {connect} from 'react-redux'

var values = [2, 11, 8, 14, 18, 20, 26, 40, 50,60];

const mapStateToProps = (state) => (
    {supply: state.realTime.supply}
)
@connect(mapStateToProps)
class SupplyConductivity extends React.Component {

    

    getValues(){
        values.splice(0,1);
        values.push(Math.round(Math.random()*30))
        return values
    }
    render() {
        const { supply } = this.props
        return (
            <div className="row">
                <div className="col-xl-6">
                    <ChartCard
                    title={'Supply Conductivity'}
                    amount={`${supply.toFixed(2)}mS/cm`}
                    chartProps={{
                        width: 120,
                        height: 107,
                        lines: [
                        {
                            values: this.getValues(),
                            colors: {
                            area: 'rgba(199, 228, 255, 0.5)',
                            line: '#004585',
                            },
                        },
                        ],
                    }}
                    />
                </div>
            </div>
        );
    }
}
export default SupplyConductivity