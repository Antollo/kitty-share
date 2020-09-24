import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReactMarkdownOptimized from './ReactMarkdownOptimized'
import ButtonBase from '@material-ui/core/ButtonBase'
import { withStyles } from '@material-ui/core/styles'
import ConditionalLink from './ConditionalLink';

const useStyles = (theme) => ({
    buttonBase: {
        display: 'block'
    }
})

class Comment extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                <ButtonBase component="div" className={classes.buttonBase}>
                    <ConditionalLink to={`/post/${this.props._id}`}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={this.props.user.name} src={this.props.user.photo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography
                                            variant="body2"
                                            color="textPrimary"
                                        >
                                            {this.props.user.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {(new Date(this.props.date)).toLocaleString()}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <ReactMarkdownOptimized source={this.props.content} />
                                }
                                secondaryTypographyProps={{ component: 'div', color: 'textPrimary' }}
                            />
                        </ListItem>
                    </ConditionalLink>
                </ButtonBase>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

export default withStyles(useStyles)(Comment)