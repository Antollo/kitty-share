import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Comment from './Comment'
import Popover from '@material-ui/core/Popover';
import ReactMarkdownOptimized from './ReactMarkdownOptimized'

const useStyles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    icon: {
        marginRight: -theme.spacing(1)
    },
    textField: {
        marginTop: 8
    },
    list: {
        display: 'flex',
        flexDirection: 'column-reverse'
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.default,
        maxWidth: '100%'
    },
})

class Comments extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            content: '',
            comments: [],
            anchorEl: null,
            popoverOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onContentChange = this.onContentChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comments !== this.props.comments)
            this.setState({ comments: [] })
    }

    onContentChange(event) {
        this.setState({ content: event.target.value, popoverOpen: false, popoverAnchor: event.target.parentNode.parentNode.parentNode })

        if (this.popoverTimeout)
            clearTimeout(this.popoverTimeout)

        if (event.target.value)
            this.popoverTimeout = setTimeout(() => {
                this.setState({ popoverOpen: true })
            }, 1000);
    }

    handleSubmit(event) {
        const content = this.state.content
        this.setState({ content: '' })

        fetch('/api/posts/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: content, parentId: this.props.parentId })
        })
            .then(response => response.json())
            .then(data => {
                const comments = this.state.comments.slice()
                comments.push({
                    _id: data._id,
                    content: content,
                    user: {
                        name: this.props.name,
                        photo: this.props.photo
                    },
                    date: new Date()
                })
                this.setState({ comments: comments })
            })
            .catch(error => console.error(error))

        event.preventDefault()
    }


    render() {
        const { classes } = this.props

        return (
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={this.props.name} src={this.props.photo} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {this.props.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {(new Date()).toLocaleString()}
                                </Typography>
                            </>
                        }
                        primaryTypographyProps={{ component: 'div' }}
                        secondary={
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <TextField
                                    margin="normal"
                                    name="content"
                                    required
                                    fullWidth
                                    label="Comment content"
                                    placeholder="An interesting story..."
                                    multiline
                                    variant="outlined"
                                    className={classes.textField}
                                    size="small"
                                    value={this.state.content}
                                    onChange={this.onContentChange}
                                    onFocus={this.onContentChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton className={classes.icon} size="small" type="submit">
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Popover
                                    classes={{
                                        paper: classes.paper,
                                    }}
                                    style={{
                                        width: `${this.state.popoverAnchor?.offsetWidth}px`
                                    }}
                                    open={this.state.popoverOpen}
                                    anchorEl={this.state.popoverAnchor}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={() => this.setState({ popoverOpen: false })}
                                    disableAutoFocus
                                    disableEnforceFocus
                                    disableRestoreFocus
                                >
                                    <Typography component="div" variant="body1">
                                        <ReactMarkdownOptimized source={this.state.content} enableLargeImage />
                                    </Typography>
                                </Popover>
                            </form>
                        }
                        secondaryTypographyProps={{ component: 'div' }}
                    />
                </ListItem>
                <div className={classes.list}>
                    {
                        this.props.comments.concat(this.state.comments).map((comment, id) => <Comment {...{ key: id, ...comment }} />)
                    }
                </div>

            </List>
        );
    }
}

export default withStyles(useStyles)(Comments)