import React from 'react'
import { withCookies } from 'react-cookie'
import Feed from './Feed'
import LogoutHandler from './LogoutHandler'
import Navbar from './Navbar'
import { Switch, Route, withRouter } from 'react-router'
import SelfLoadingPost from './SelfLoadingPost'

class AppMain extends React.Component {

    constructor(props) {
        super(props)

        this.initialPosts = (new Array(5)).fill({ loading: true })

        this.state = {
            name: this._name(),
            photo: this._photo(),
            posts: this.initialPosts
        }
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    _name() {
        const user = this.props.cookies.get('user')
        if (user?.name)
            return user.name
        else
            return ''
    }

    _photo() {
        const user = this.props.cookies.get('user')
        if (user?.photo)
            return user.photo
        else
            return ''
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
                <Navbar name={this.state.name} photo={this.state.photo} onNewPost={this.fetchPosts} />
                <Switch>
                    <Route path="/post/:_id" children={({ match }) =>
                        (<SelfLoadingPost name={this.state.name} photo={this.state.photo} _id={match.params._id} />)
                    } />
                    <Route>
                        <Feed name={this.state.name} photo={this.state.photo} posts={this.state.posts} fetchPosts={this.fetchPosts} />
                    </Route>
                </Switch>
                <LogoutHandler name={this.state.name} />
            </>
        )
    }
}

export default withCookies(AppMain)
