import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from '@material-ui/lab/Skeleton'

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
    }
})

class Image extends React.Component {
    render() {
        return (
            <img
                className="markdown"
                alt={this.props.alt}
                src={this.props.src}
            />
        )
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false
        }
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
                            <Avatar alt={this.props.name} src={this.props.photo} />
                    }
                    title={
                        this.props.loading ?
                            <Skeleton animation="wave" height={10} width="50%" style={{ marginBottom: 6 }} />
                            :
                            this.props.name
                    }
                    subheader={
                        this.props.loading ?
                            <Skeleton animation="wave" height={10} width="30%" />
                            :
                            (new Date(this.props.date)).toLocaleString()
                    }
                />
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
                                    <ReactMarkdown source={this.props.content} renderers={{ image: Image }} />
                                </Typography>
                            )
                    }
                </CardContent>
                {
                    this.props.loading ? null : (
                        <>
                            <CardActions disableSpacing>
                                <IconButton>
                                    <ThumbUpIcon fontSize="small" />
                                </IconButton>
                                <IconButton>
                                    <ThumbDownIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    className={classes.expand + ' ' + (this.state.expanded ? classes.expandOpen : classes.expandClose)}
                                    onClick={() => this.setState({ expanded: !this.state.expanded })}
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {this.props.children}
                                </CardContent>
                            </Collapse>
                        </>
                    )
                }
            </Card>
        )
    }
}

export default withStyles(useStyles)(Post)