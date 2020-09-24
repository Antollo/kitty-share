import React from 'react'
import { withRouter } from 'react-router'

class ConditionalLink extends React.Component {
    render() {
        const condition = this.props.to && this.props.location.pathname !== this.props.to

        return <div onClick={() => { if (condition) this.props.history.push(this.props.to) }}> {this.props.children} </div>
    }
}

export default withRouter(ConditionalLink)
