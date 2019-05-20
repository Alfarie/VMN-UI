import React from 'react'
import { Button } from 'antd'
import ProfileMenu from './ProfileMenu'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import BitcoinPrice from './BitcoinPrice'
import HomeMenu from './HomeMenu'
import LiveSearch from './LiveSearch'
import './style.scss'

import { connect } from 'react-redux'
const mapStateToProps = state => {
  return { datetime: state.realTime.datetime }
}
@connect(mapStateToProps)
class TopBar extends React.Component {
  render() {
    const { datetime } = this.props
    return (
      <div className="topbar">
        <div className="topbar__left">
          <span className="badge badge-primary">
            {' '}
            <span style={{ fontSize: '20px' }}>
              {' '}
              <i className={'icmn-clock'} /> {datetime}
            </span>
          </span>
        </div>
        <div className="topbar__right">
          {/* <HomeMenu /> */}
          <ProfileMenu />
        </div>
      </div>
    )
  }
}

export default TopBar
