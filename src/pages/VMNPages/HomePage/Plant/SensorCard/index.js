import React from 'react'
import { Progress } from 'antd'
import Donut from '../../../../../components/CleanComponents/Donut'
class SensorCard extends React.Component {
  showEC() {
    const { ec } = this.props.value
    return (
      <Progress
        type="dashboard"
        status="success"
        width={60}
        percent={(ec * 100) / 2}
        format={percent => {
          return `${ec.toFixed(2)} mS/cm`
        }}
      />
    )
  }

  showVolume() {
    const { volume } = this.props.value
    return (
      <Progress
        type="dashboard"
        percent={(volume * 100) / 1000}
        width={60}
        status="active"
        format={percent => {
          return `${volume.toFixed(0)}ML`
        }}
      />
    )
  }
  render() {
    // console.log(value)
    return (
      <div className="col col-lg-3 col-md-4 col-xs-6">
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Plant: {this.props.id}</strong>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              {this.showEC()}
              {this.showVolume()}
            </div>
          </div>
          <div className="card-footer">
            <Donut type="success" name="Conductivity" />
            <Donut type="primary" name="Drain" />
          </div>
        </section>
      </div>
    )
  }
}

export default SensorCard
