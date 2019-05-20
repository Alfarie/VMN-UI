import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

import { Button, Icon } from 'antd'
import './HomePage.css'

import Supply from './Supply'
import Plant from './Plant'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { getOperation } from 'ducks/vmn-operation'
import { _getControl } from 'ducks/control'
import { getPreset } from 'ducks/preset'
const mapStateToProps = (state, props) => ({})

@connect(mapStateToProps)
class HomePage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    console.log('[Info] Retrive data from MPU')
    dispatch(getOperation())
    dispatch(_getControl())
    dispatch(getPreset())
  }

  render() {
    const props = this.props
    const path = props.location.pathname
    if (path === '/') {
      return <Redirect to="/home/plant" />
    }
    return (
      <Page {...props}>
        <Helmet title="Monitoring" />
        <Supply />
        <Plant />
      </Page>
    )
  }
}

export default HomePage
