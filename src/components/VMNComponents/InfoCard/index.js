import React from 'react'
import './style.scss'
import { stats, commerceStats } from './data.json'

class InfoCard extends React.Component {
  static defaultProps = {
    form: 'stats',
    icon: 'bullhorn',
    type: '',
    btnType: 'default',
  }

  render() {
    const { form, icon, type, value, title } = this.props
    const className = `infoCard ${type.length > 0 ? 'infoCard--' + type : ''}`
    return (
      <div>
        {form === 'bordered' && (
          <div className={className + ' infoCard--bordered'}>
            {icon !== false && (
              <span className="infoCard__digit">
                <i className={'icmn-' + icon} />
              </span>
            )}
            <div className="infoCard__desc">
              <span className="infoCard__title">{title}</span>
              <p>Total supply (ml/plant)</p>
            </div>

            <div className="infoCard__right">
              <h4>{value}</h4>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default InfoCard
