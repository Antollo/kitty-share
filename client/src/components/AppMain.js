import React from 'react'
import { withCookies } from 'react-cookie'
import Feed from './Feed'
import LogoutHandler from './LogoutHandler'
import Navbar from './Navbar'
import PathRedirect from './PathRedirect'
import { Switch, Route, withRouter } from 'react-router'
import SelfLoadingPost from './SelfLoadingPost'

class AppMain extends React.Component {

    constructor(props) {
        super(props)

        this.initialPosts = (new Array(5)).fill({ loading: true })

        this.state = {
            path: this.props.location.pathname.slice(1) + this.props.location.search,
            push: true,
            name: this._name(),
            photo: this._photo(),
            posts: this.initialPosts
        }

        this.setPath = this.setPath.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
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
        this.setState({
            path: path,
            push: this.state.path !== path.slice(0, -1)
        })
    }

    fetchPosts() {
        fetch('/api/posts', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: data })
                //console.log(data)
            })
            .catch(error => console.error(error))
    }

    render() {
        return (
            <>
                <Navbar setPath={this.setPath} name={this.state.name} photo={this.state.photo} onNewPost={this.fetchPosts} />
                <Switch>
                    <Route path="/post/:_id" children={({ match }) =>
                        (<SelfLoadingPost name={this.state.name} photo={this.state.photo} _id={match.params._id} />)
                    } />
                    <Route>
                        <Feed setPath={this.setPath} name={this.state.name} photo={this.state.photo} posts={this.state.posts} fetchPosts={this.fetchPosts} />
                    </Route>
                </Switch>
                <LogoutHandler name={this.state.name} >
                    <PathRedirect path={this.state.path} push={this.state.push} />
                </LogoutHandler>
            </>
        )
    }
}

export default withCookies(withRouter(AppMain))
