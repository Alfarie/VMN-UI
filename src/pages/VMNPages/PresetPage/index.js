import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import PresetPage from './PresetPage'

class SettingPage extends React.Component {
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Setting Page" />
        <PresetPage />
      </Page>
    )
  }
}

export default SettingPage
