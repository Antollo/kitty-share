import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import qs from 'qs'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { withRouter } from 'react-router'
import Post from './Post'


const useStyles = (theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        thumb: {
            cursor: 'pointer',
            borderRadius: 'inherit',
            backgroundColor: theme.palette.text.secondary
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
        this.renderThumb = this.renderThumb.bind(this);

        this.props.fetchPosts()
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

    renderThumb({ style }) {
        return <div style={style} className={this.props.classes.thumb} />
    }

    render() {
        const { classes } = this.props

        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Scrollbars style={{ flexGrow: 1 }} autoHide renderThumbHorizontal={this.renderThumb} renderThumbVertical={this.renderThumb}>
                    <Container maxWidth="sm" className={classes.container} >
                        <Grid container spacing={4} wrap="nowrap" direction="column-reverse">
                            {
                                this.search().map(
                                    (post, id) => (
                                        <Grid item key={id}>
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
                </Scrollbars>
                <div className={classes.toolbar} />
            </div>
        )
    }
}

export default withStyles(useStyles)(withRouter(Feed))