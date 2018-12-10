import React from 'react'
import { connect } from 'react-redux'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import moment from 'moment'
import DateForm from './DateForm'
import Graph from './Graph'
const mapStateToProps = state => ({})

@connect(mapStateToProps)
export class DataLogger extends React.Component {
  render() {
    const props = this.props
    return (
      <Page {...props}>
        <Helmet title="Monitoring" />
        <DateForm />
        <Graph />
      </Page>
    )
  }
}

export default DataLogger
