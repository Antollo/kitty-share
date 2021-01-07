import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import ButtonBase from '@material-ui/core/ButtonBase'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import Comments from './Comments.js'
import ConditionalLink from './ConditionalLink.js'
import ReactMarkdownOptimized from './ReactMarkdownOptimized'

const StyledBadge = withStyles(() => ({
    badge: {
        right: -6,
        top: -6
    }
}))(Badge)

const useStyles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    expandClose: {
        transform: 'rotate(0deg)'
    },
    content: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    buttonBase: {
        display: 'block'
    }
})

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: Boolean(props.expanded),
            likeCount: 0,
            dislikeCount: 0,
            tags: new Set()
        }

        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
        this.expand = this.expand.bind(this)
        this.setTags = this.setTags.bind(this)
    }

    like(event) {
        event.stopPropagation()
        this.setState({ likeCount: (this.state.likeCount ? 0 : 1) * (this.props.likes ? -1 : 1) })
        if (this.props._id?.length)
            fetch(`/api/posts/like/${this.props._id}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))
    }

    dislike(event) {
        event.stopPropagation()
        this.setState({ dislikeCount: (this.state.dislikeCount ? 0 : 1) * (this.props.dislikes ? -1 : 1) })
        if (this.props._id?.length)
            fetch(`/api/posts/dislike/${this.props._id}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error))
    }

    expand(event) {
        event.stopPropagation()
        this.setState({ expanded: !this.state.expanded })
    }

    setTags(tags) {
        this.setState({ tags: tags })
    }

    render() {
        const { classes } = this.props

        return (
            <Card>
                <CardHeader
                    avatar={
                        this.props.loading ?
                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                            :
                            <Avatar alt={this.props.user.name} src={this.props.user.photo} />
                    }
                    title={
                        this.props.loading ?
                            <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                            :
                            this.props.user.name
                    }
                    subheader={
                        this.props.loading ?
                            <Skeleton animation="wave" height={10} width="30%" />
                            :
                            (new Date(this.props.date)).toLocaleString()
                    }
                />
                <ButtonBase component="div" className={classes.buttonBase}>
                    <ConditionalLink to={this.props._id ? `/post/${this.props._id}` : null}>
                        <CardContent className={classes.content}>
                            {
                                this.props.loading ? (
                                    <>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </>
                                ) : (
                                        <Typography component="div" variant="body1">
                                            <ReactMarkdownOptimized source={this.props.content} setTags={this.setTags} enableLargeImage />
                                        </Typography>
                                    )
                            }
                        </CardContent>
                    </ConditionalLink>
                </ButtonBase>
                {
                    this.props.loading ? null : (
                        <>
                            <CardActions disableSpacing>

                                <IconButton onClick={this.like}>
                                    <StyledBadge badgeContent={this.props.likeCount + this.state.likeCount} color="primary">
                                        <ThumbUpIcon fontSize="small" color={((this.props.likes ? 1 : 0) + this.state.likeCount) ? 'primary' : undefined} />
                                    </StyledBadge>
                                </IconButton>

                                <IconButton onClick={this.dislike}>
                                    <StyledBadge badgeContent={this.props.dislikeCount + this.state.dislikeCount} color="secondary">
                                        <ThumbDownIcon fontSize="small" color={((this.props.dislikes ? 1 : 0) + this.state.dislikeCount) ? 'secondary' : undefined} />
                                    </StyledBadge>
                                </IconButton>

                                {this.props.noComments ? null :
                                    <IconButton
                                        className={classes.expand + ' ' + (this.state.expanded ? classes.expandOpen : classes.expandClose)}
                                        onClick={this.expand}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                }
                            </CardActions>
                            {this.props.noComments ? null :
                                <Collapse in={this.state.expanded} timeout="auto" >
                                    <Comments name={this.props.name} photo={this.props.photo} comments={this.props.comments} parentId={this.props._id} />
                                </Collapse>
                            }
                        </>
                    )
                }
            </Card >
        )
    }
}

export default withStyles(useStyles)(Post)