import React from 'react'
import { withCookies } from 'react-cookie'
import Feed from './Feed'
import LogoutHandler from './LogoutHandler'
import Navbar from './Navbar'
import PathRedirect from './PathRedirect'
import { withRouter } from 'react-router'

class AppMain extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            path: this.props.location.pathname.slice(1) + this.props.location.search,
            push: true,
            name: this._name(),
            photo: this._photo()
        }

        this.handleLogout = this.handleLogout.bind(this)
        this.setPath = this.setPath.bind(this)
    }

    _name() {
        const user = this.props.cookies.get('user')
        if (user && user.name)
            return user.name
        else
            return ''
    }

    _photo() {
        const user = this.props.cookies.get('user')
        if (user && user.photo)
            return user.photo
        else
            return ''
    }

    setPath(path) {
        console.log(path)
        this.setState({
            path: path,
            push: this.state.path !== path.slice(0, -1)
        })
    }

    handleLogout() {
        console.log('handleLogout')
        this.setState({
            name: this._name(),
            photo: this._photo()
        })
    }

    render() {
        return (
            <>
                <Navbar setPath={this.setPath} name={this.state.name} photo={this.state.photo} />
                <Feed setPath={this.setPath} name={this.state.name} photo={this.state.photo} />
                <LogoutHandler name={this.state.name} handleLogout={this.handleLogout} >
                    <PathRedirect path={this.state.path} push={this.state.push} />
                </LogoutHandler>
            </>
        )
    }
}

export default withCookies(withRouter(AppMain))
