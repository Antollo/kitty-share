import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import qs from 'qs'
import React from 'react'
import { withRouter } from 'react-router'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Post from './Post'


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    warning: {
        margin: theme.spacing(0, 0, 0)
    },
    area: {
        height: 'calc(100vh - 56px)',
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            height: 'calc(100vh - 48px)',
        },
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100vh - 64px)',
        },
    }
})

class Feed extends React.Component {

    constructor(props) {
        super(props)

        this.initialPosts = (new Array(5)).fill({ loading: true })

        this.state = {
            posts: this.initialPosts
        }

        this.fetchPosts = this.fetchPosts.bind(this)
        this.search = this.search.bind(this)
    }

    fetchPosts() {
        this.setState({ posts: this.initialPosts })

        fetch('/api/posts', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => this.setState({ posts: data }))
            .catch(error => console.error(error))
    }

    search() {
        const searchText = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search
        if (searchText && searchText.length)
            return this.state.posts.filter(post => searchText.split(/\s+/).every(el => post.loading || post.content.indexOf(el) !== -1))
        else
            return this.state.posts
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        const { classes } = this.props
        return (
            <PerfectScrollbar className={classes.area}>
                <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={4} wrap="nowrap" direction="column">
                        {
                            this.search().map(
                                (post, id) => (
                                    <Grid item key={id}>
                                        <Post
                                            {...(post.loading ? { loading: true } : {
                                                loading: false,
                                                name: post.user.name,
                                                photo: post.user.photo,
                                                date: post.date,
                                                content: post.content
                                            })}
                                        />
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                </Container>
            </PerfectScrollbar>
        )
    }
}

export default withStyles(useStyles)(withRouter(Feed))