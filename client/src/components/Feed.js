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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar
})

class Feed extends React.Component {

    constructor(props) {
        super(props)

        this.search = this.search.bind(this)
    }

    search() {
        const searchText = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search
        if (searchText && searchText.length)
            return this.props.posts.filter(post => searchText.split(/\s+/).every(el => post.loading || post.content.indexOf(el) !== -1))
        else
            return this.props.posts
    }

    render() {
        const { classes } = this.props
        return (
            /*<PerfectScrollbar>*/
            <>
                <Container maxWidth="sm" className={classes.container} >
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
                </Container >
                <div className={classes.toolbar} />
            </>
            /*</PerfectScrollbar>*/
        )
    }
}

export default withStyles(useStyles)(withRouter(Feed))