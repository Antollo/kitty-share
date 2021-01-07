import React from 'react'
import { Redirect } from 'react-router-dom'

class LogoutHandler extends React.Component {

    render() {
        if (this.props.name?.length)
            return <>{this.props.children}</>
        else
            return <Redirect to="/login" push/>
    }
}

export default LogoutHandler