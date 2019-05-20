import React from 'react'
import InfoCard from 'components/VMNComponents/InfoCard'

const SupplyWater = props => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          {/* <div className="card-header">
                    
                  </div> */}
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <InfoCard
                  form="bordered"
                  icon="droplet"
                  type="success"
                  title="Channel: 1"
                  value={`${props.supplyWater[0]} ML`}
                />
              </div>
              <div className="col-lg-6">
                <InfoCard
                  form="bordered"
                  icon="droplet"
                  type="success"
                  title="Channel: 2"
                  value={`${props.supplyWater[1]} ML`}
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: '12px' }}>
              <div className="col-lg-6">
                <InfoCard
                  form="bordered"
                  icon="droplet"
                  type="success"
                  title="Channel: 3"
                  value={`${props.supplyWater[2]} ML`}
                />
              </div>
              <div className="col-lg-6">
                <InfoCard
                  form="bordered"
                  icon="droplet"
                  type="success"
                  title="Channel: 4"
                  value={`${props.supplyWater[3]} ML`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyWater
