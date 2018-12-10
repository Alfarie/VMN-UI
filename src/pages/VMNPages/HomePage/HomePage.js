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
const mapStateToProps = (state, props) => ({})

@connect(mapStateToProps)
class HomePage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    console.log('component did mount')
    dispatch(getOperation())
  }

  render() {
    const ButtonGroup = Button.Group
    const props = this.props
    // console.log(props)
    const path = props.location.pathname
    if (path === '/') {
      return <Redirect to="/home/plant" />
    }
    return (
      <Page {...props}>
        <Helmet title="Monitoring" />

        <div className="right-div">
          <ButtonGroup>
            <Link to="/home/plant">
              <Button type="default">Plant</Button>
            </Link>
            <Link to="/home/supply">
              <Button type="default">Supply</Button>
            </Link>
          </ButtonGroup>
        </div>

        <Route path="/home/supply" component={Supply} />
        <Route path="/home/plant" component={Plant} />
      </Page>
    )
  }
}

export default HomePage
