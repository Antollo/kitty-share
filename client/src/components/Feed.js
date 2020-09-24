import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import qs from 'qs'
import React from 'react'
import { withRouter } from 'react-router'
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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar
})

@withRouter
class Feed extends React.Component {

    constructor(props) {
        super(props)

        this.search = this.search.bind(this)
    }

    search() {
        const searchText = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search
        if (searchText && searchText.length)
            return this.props.posts.filter(post => searchText.toLowerCase().split(/\s+/).every(el => post.loading || post.content.toLowerCase().indexOf(el) !== -1))
        else {
            if (this.props.posts && this.props.posts.length)
                return this.props.posts
            else
                return []
        }
    }

    render() {
        const { classes } = this.props
        return (
            /*<PerfectScrollbar>*/
            <>
                <Container maxWidth="sm" className={classes.container} >
                    <Grid container spacing={4} wrap="nowrap" direction="column-reverse">
                        {
                            this.search().map(
                                (post, id) => (
                                    <Grid item key={id}>
                                        <Post
                                            {...(post.loading ? { loading: true } : {
                                                loading: false,
                                                _id: post._id,
                                                userName: post.user.name,
                                                userPhoto: post.user.photo,
                                                date: post.date,
                                                content: post.content,
                                                likes: post.likes && post.likes.length !== 0,
                                                likeCount: post.likeCount,
                                                dislikes: post.dislikes && post.dislikes.length !== 0,
                                                dislikeCount: post.dislikeCount,
                                                name: this.props.name,
                                                photo: this.props.photo,
                                                comments: post.comments
                                            })}
                                        />
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                </Container >
                <div className={classes.toolbar} />
            </>
            /*</PerfectScrollbar>*/
        )
    }
}

export default withStyles(useStyles)(Feed)