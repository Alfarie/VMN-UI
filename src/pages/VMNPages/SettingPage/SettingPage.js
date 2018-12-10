import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

import {Button, Icon} from 'antd'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import VMNSetting from './VMNSetting'
import WifiSetting from './WifiSetting'
import DateTimeSetting from './DateTimeSetting'
class SettingPage extends React.Component {
  
  render() {
    const ButtonGroup = Button.Group
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Setting Page" />
        <Route path="/setting/nvm-setting" component={VMNSetting} />
        <Route path="/setting/wifi" component={WifiSetting} />
        <Route path="/setting/datetime" component={DateTimeSetting} />
      </Page>
    )
  }
}

export default SettingPage
