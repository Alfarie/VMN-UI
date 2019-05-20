import React from 'react'
import SupplyConductivity from './SupplyConductivity'
import SupplyWater from './SupplyWater'
import { connect } from 'react-redux'
import { setOperation } from 'ducks/vmn-operation'

const supplyWater = 'supply-water'
const mapStateToProps = (state, props) => {
  return {
    [supplyWater]: state.operation['supply-water'],
    operation: state.operation.operation,
  }
}
@connect(mapStateToProps)
class Supply extends React.Component {
  render() {
    const { operation } = this.props
    return (
      <div>
        <div className="utils__title utils__title--flat mb-3">
          <span className="text-uppercase font-size-16">
            {' '}
            Operator: <strong>{operation['operator-name']}</strong>
          </span>
        </div>
        <SupplyConductivity />
      </div>
    )
  }
}

export default Supply
