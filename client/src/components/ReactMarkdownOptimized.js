import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withProps } from 'recompose'
import { Link } from '@material-ui/core'
import visit from 'unist-util-visit'
import linkifyRegex from 'remark-linkify-regex'
import { withStyles } from '@material-ui/core/styles'
import TagChip from './TagChip'

const useStyles = (theme) => ({
    image: {
        maxWidth: '100%'
    },
    largeImage: {
        maxWidth: `calc(100% + ${theme.spacing(4)}px)`,
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2)
    },
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
        if (this.img.current.clientWidth < this.img.current.naturalWidth && this.props.enableLargeImage)
            this.setState({
                large: true
            })
    }

    componentDidMount() {
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

    constructor(props) {
        super(props)

        this.tags = new Set()
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.source !== this.props.source
    }

    componentDidUpdate() {
        if (this.props.setTags)
            this.props.setTags(this.tags)
    }

    render() {
        return (<ReactMarkdown
            {
            ...{
                plugins: [linkifyRegex(/\btag:\S+/), () => (tree => {
                    tree.children.unshift({ type: 'div', children: [] })
                    this.tags.clear()
                    visit(tree, 'link', node => {
                        if (/\btag:\S+/.test(node.url)) {
                            tree.children[0].children.push({ type: 'tagChip', value: node.url.substring(4) })
                            this.tags.add(node.url.substring(4))
                            node.type = 'discard'
                        }
                    })
                    return tree
                })],
                renderers: {
                    image: withStyles(useStyles)(withProps(this.props)(Image)),
                    link: Link,
                    tagChip: props => <TagChip {...props} />,
                    div: props => <div {...props} />,
                    discard: () => null
                },
                escapeHtml: false,
                ...this.props
            }
            }

        />)
    }
}

export default ReactMarkdownOptimized