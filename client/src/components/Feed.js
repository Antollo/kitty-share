import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import qs from 'qs'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { withRouter } from 'react-router'
import Post from './Post'
import Scrollable from './Scrollable'


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    hidden: {
        display: 'none'
    },
    toolbar: theme.mixins.toolbar
})

class Feed extends React.Component {

    constructor(props) {
        super(props)

        this.search = this.search.bind(this)
        this.props.fetchPosts()
    }

    search() {
        const q = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        const searchText = q.search
        const tags = q.tags
        console.log(q)
        if (searchText?.length || tags?.length)
            return this.props.posts.map(post => ({
                ...post,
                visible: post.loading
                    || (
                        (!searchText?.length || searchText.toLowerCase().split(/\s+/).every(el => post.content.toLowerCase().indexOf(el) !== -1))
                        && (!tags?.length || tags.every(el => RegExp(`\\btag:${el}\\b`).test(post.content.replace(/```[^`]+```/g, '').replace(/`[^`]+`/g, ''))))
                    )
            }))
        else {
            if (this.props.posts?.length)
                return this.props.posts
            else
                return []
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Scrollable>
                <Container maxWidth="sm" className={classes.container} >
                    <Grid container spacing={4} wrap="nowrap" direction="column-reverse">
                        {
                            this.search().map(
                                (post, id) => (
                                    <Grid item key={id} className={post.visible !== false ? null : this.props.classes.hidden}>
                                        <Post
                                            {...{
                                                name: this.props.name,
                                                photo: this.props.photo,
                                                ...post
                                            }}
                                        />
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                </Container >
            </Scrollable>
        )
    }
}

export default withStyles(useStyles)(withRouter(Feed))