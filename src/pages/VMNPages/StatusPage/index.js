import React from 'react'
import { Link } from 'react-router-dom'


import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'

import { connect } from 'react-redux'


const mapStateToProps = (state, props) => {
  return {
    statusPage: state.app.statusPage
  }
}
@connect(mapStateToProps)
class StatusPage extends React.Component {
  render() {
    const props = this.props
    const { title, description } = props.statusPage
    return (
      <Page {...props}>
        <Helmet title="Monitoring" />
        <div className="text-center">
          <div className="w-50 d-inline-block pt-5 pb-5 mt-5 mb-5">
            <h1 className="mb-4">
              <strong>{title}</strong>
            </h1>
            <p className="mb-4">
              {description}
            </p>
            <Link to="/" className="btn">
              Go back to the main page
            </Link>
          </div>
        </div>
      </Page>
    )
  }
}

StatusPage.defaultProps = {
  title: 'Show Status',
  description: 'this is description'
}


export default StatusPage

