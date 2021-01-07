import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Scrollable from './Scrollable'
import React from 'react'
import Post from './Post'


const useStyles = (theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar
})

class SelfLoadingPost extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true
        }

        this.fetchPost = this.fetchPost.bind(this)
        this.fetchPost()
    }

    componentDidUpdate(prevProps, _prevState) {
        if (prevProps._id !== this.props._id)
            this.fetchPost()
    }

    fetchPost() {
        fetch(`/api/posts/${this.props._id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.content)
                    this.setState({ loading: false, ...data })
            })
            .catch(error => console.error(error))
    }

    render() {
        const { classes } = this.props

        return (
            <Scrollable>
                <Container maxWidth="sm" className={classes.container} >
                    <Grid container spacing={4} wrap="nowrap" direction="column">
                        <Grid item>
                            <IconButton onClick={() => this.props.history.goBack()} >
                                <ArrowBackIcon fontSize="default" />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Post expanded
                                {...{
                                    name: this.props.name,
                                    photo: this.props.photo,
                                    ...this.state
                                }}
                            />
                        </Grid>

                    </Grid>
                </Container>
            </Scrollable>

        )
    }
}

export default withStyles(useStyles)(withRouter(SelfLoadingPost))