import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withProps } from 'recompose'
import { Link } from '@material-ui/core'

const useStyles = (theme) => ({
    image: {
        maxWidth: '100%'
    },
    largeImage: {
        maxWidth: `calc(100% + ${theme.spacing(4)}px)`,
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2)
    }
})

class Image extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            large: false
        }

        this.img = React.createRef()
        this.onLoad = this.onLoad.bind(this)
    }

    onLoad() {
        //console.log(this.img.current.clientWidth, this.img.current.naturalWidth)
        if (this.img.current.clientWidth < this.img.current.naturalWidth && this.props.enableLargeImage)
            this.setState({
                large: true
            })
    }

    componentDidMount() {
        //console.log(this.img.current)
        this.img.current.addEventListener('load', this.onLoad)
    }

    componentWillUnmount() {
        this.img.current.removeEventListener('load', this.onLoad)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.src !== this.props.src || nextState.large !== this.state.large
    }

    render() {
        const { classes } = this.props
        return (
            <img
                ref={this.img}
                className={this.state.large ? classes.largeImage : classes.image}
                alt={this.props.alt}
                src={this.props.src}
            />
        )
    }
}

class ReactMarkdownOptimized extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.source !== this.props.source
    }

    render() {
        return <ReactMarkdown {...this.props} renderers={{ image: withStyles(useStyles)(withProps(this.props)(Image)), link: Link }} />
    }
}

export default ReactMarkdownOptimized