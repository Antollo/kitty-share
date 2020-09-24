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
    }
})

class Comments extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            content: '',
            comments: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate(nextProps) {
        if (nextProps.comments !== this.props.comments)
            this.setState({ comments: [] })
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
                                    autoFocus
                                    margin="normal"
                                    name="content"
                                    required
                                    fullWidth
                                    label="Post content"
                                    placeholder="An interesting story..."
                                    multiline
                                    variant="outlined"
                                    className={classes.textField}
                                    size="small"
                                    value={this.state.content}
                                    onChange={e => this.setState({ content: e.target.value })}
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