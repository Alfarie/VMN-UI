import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

import SummaryPage from './SummaryPage'

import { connect } from 'react-redux'

const mapStateToProps = (state, props) => ({})
@connect(mapStateToProps)
class HomePage extends React.Component {
  render() {
    const props = this.props;
    return (
      <Page {...props}>
        <Helmet title="Summary" />
        <SummaryPage/>
      </Page>
    )
  }
}

export default HomePage
