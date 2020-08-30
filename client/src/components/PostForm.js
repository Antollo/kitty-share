import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import SubjectIcon from '@material-ui/icons/Subject'
import VisibilityIcon from '@material-ui/icons/Visibility'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Post from './Post'

const useStyles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    background: {
        backgroundColor: theme.palette.background.default
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


class PostForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            content: '',
            tab: 0
        }
    }

    handleSubmit(event) {
        console.log(this.state.content)

        fetch('/api/posts/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: this.state.content })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        event.preventDefault()
    }

    render() {
        const { classes } = this.props

        return (
            <>
                <Zoom in={this.props.searchText.length === 0}>
                    <Fab color="primary" aria-label="add" className={classes.fabButton} onClick={() => this.setState({ open: true })}>
                        <AddIcon />
                    </Fab >
                </Zoom>
                <Dialog fullScreen open={this.state.open} onClose={() => this.setState({ open: false })} TransitionComponent={Transition}
                    PaperProps={{ className: classes.background }}>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <AppBar className={classes.appBar} color="default" elevation={0}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={() => this.setState({ open: false })} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    New post
                                </Typography>
                                <Button type="submit" color="inherit" onClick={() => this.setState({ open: false })} endIcon={<Icon>send</Icon>}>
                                    Post
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.tab}
                                onChange={(_, v) => this.setState({ tab: v })}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab icon={<SubjectIcon />} index={0} />
                                <Tab icon={<VisibilityIcon />} index={1} />
                            </Tabs>
                        </AppBar>

                        <SwipeableViews
                            index={this.state.tab}
                            onChange={v => { if (typeof v === 'number') this.setState({ tab: v }) }}
                        >
                            <Container maxWidth="sm">
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Post content"
                                    placeholder="An interesting story..."
                                    multiline
                                    variant="outlined"
                                    value={this.state.content}
                                    onChange={e => this.setState({ content: e.target.value })}
                                />
                            </Container>
                            <Container maxWidth="sm" className={classes.container}>
                                <Grid container wrap="nowrap" direction="column">
                                    <Grid item>
                                        <Post content={this.state.content} name={this.props.name} photo={this.props.photo} date={(new Date()).toISOString()} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </SwipeableViews>
                    </form>
                </Dialog>
            </>
        )
    }
}

export default withStyles(useStyles)(PostForm)