
import React from 'react'
import {Button, Form} from 'antd'
const FormItem = Form.Item;

class RefreshButton extends React.Component {

    render(){
        const {type, loading, htmlType, title, onSubmit} = this.props
        return(
            <FormItem>
                {
                    (!onSubmit)?(
                        <Button type={type} loading={loading} htmlType={htmlType}>
                            {title}
                        </Button>
                    ):(
                        <Button type={type} loading={loading} htmlType={htmlType} onClick={this.props.onSubmit}>
                            {title} s
                        </Button>
                    )
                }
                
            </FormItem>
        )
    }
}

RefreshButton.defaultProps = {
    type: 'default',
    title: 'Button',
    htmlType: 'button',
    loading: true
}

export default RefreshButton;