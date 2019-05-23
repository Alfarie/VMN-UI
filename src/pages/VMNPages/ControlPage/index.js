import React from 'react'
import Page from 'components/LayoutComponents/Page'
import Helmet from 'react-helmet'
import ControlPage from './ControlPage'

class SettingPage extends React.Component {
    render() {
        const props = this.props
        return (
            <Page {...props}>
                <Helmet title="Setting Page" />
                <ControlPage/>
            </Page>
        )
    }
}

export default SettingPage
