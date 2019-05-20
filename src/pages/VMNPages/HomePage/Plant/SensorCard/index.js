import React from 'react'
import { Progress, Button } from 'antd'
import Donut from '../../../../../components/CleanComponents/Donut'

const topRight = {
  position: "absolute",
  background: "#082540",
  right: 0,
  top: "40px"
}
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
    const { numberOfPlant } = this.props
    return (
      <Progress
        type="dashboard"
        percent={(volume * 100 / numberOfPlant) / 1000}
        width={60}
        status="active"
        format={percent => {
          return  `${ (volume/numberOfPlant).toFixed(0)} ML`
        }}
      />
    )
  }

  showPercent() {
    const currentConsume = (this.props.currentConsume * 1000).toFixed(0);
    const { volume } = this.props.value
    return (
      <Progress
        type="dashboard"
        percent={(volume * 100) / currentConsume}
        strokeColor="#42ebf4"
        width={60}
        status="active"
        format={percent => {
          return  `${percent.toFixed(0)}%`
        }}
      />
    )
  }
  render() {
    // console.log(this.props)
    const totalConsume = (this.props.totalConsume * 1000).toFixed(0);
    const currentConsume = (this.props.currentConsume * 1000).toFixed(0);
    return (
      <div className="col col-lg-3 col-md-3 col-xs-6">
        <section className="card">

          <div className="card-header">
            <div className="utils__title">

              <div className="d-flex justify-content-between">
                <strong style={{fontSize: '12px'}}>{this.props.id}</strong>
                <span style={{fontSize: '12px'}}> {currentConsume}/{totalConsume} ml</span>
              </div>


            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              {this.showEC()}
              {(this.props.mode === 1) ? this.showPercent():this.showVolume()}

            </div>

          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-around">
              <Donut type="success" name="EC " />
              {
                (this.props.mode === 1) ?
                  <Donut type="primary" name="Drain(%)" />
                  : <Donut type="primary" name="Drain" color="#42ebf4" />
              }
            </div>

          </div>
        </section>
      </div>
    )
  }
}

export default SensorCard
