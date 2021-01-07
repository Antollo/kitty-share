import React from 'react'
import { Redirect } from 'react-router-dom'

class PathRedirect extends React.Component {
    render() {
        if (this.props.path?.length)
            return <Redirect to={'/' + this.props.path} push={this.props.push} />
        else
            return <Redirect to={'/'} push/>
    }
}

export default PathRedirect