import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReactMarkdownOptimized from './ReactMarkdownOptimized'

class Comment extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={this.props.comment.user.name} src={this.props.comment.user.photo} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {this.props.comment.user.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {(new Date(this.props.comment.date)).toLocaleString()}
                                </Typography>
                            </>
                        }
                        secondary={
                            <ReactMarkdownOptimized source={this.props.comment.content} />
                        }
                        secondaryTypographyProps={{ component: 'div', color: 'textPrimary' }}
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default Comment