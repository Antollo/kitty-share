import React from 'react'
import ReactMarkdown from 'react-markdown'
import { withProps } from 'recompose'
import { Link, Chip } from '@material-ui/core'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import visit from 'unist-util-visit'
import { getColor } from 'random-material-color'
import linkifyRegex from 'remark-linkify-regex'
import qs from 'qs'
import { withRouter } from 'react-router'


const useStyles = (theme) => ({
    chip: {
        marginRight: theme.spacing(1)
    }
})

const textToThemeMap = new Map()

class TagChip extends React.Component {

    constructor(props) {
        super(props)

        this.addTagsQuery = this.addTagsQuery.bind(this)
        this.removeTagsQuery = this.removeTagsQuery.bind(this)
        this.hasTagsQuery = this.hasTagsQuery.bind(this)
    }

    hasTagsQuery() {
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        return Array.isArray(query.tags) && query.tags.indexOf(this.props.value) !== -1
    }

    addTagsQuery(ev) {
        ev.stopPropagation()
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        if (Array.isArray(query.tags)) {
            if (query.tags.indexOf(this.props.value) === -1)
                query.tags.push(this.props.value)
        } else
            query.tags = [this.props.value]
        const path = qs.stringify(query, {
            addQueryPrefix: true,
            encode: false
        })
        this.props.history.push(path)
    }

    removeTagsQuery(ev) {
        ev.stopPropagation()
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        if (Array.isArray(query.tags)) {
            const i = query.tags.indexOf(this.props.value);
            if (i !== -1) {
                query.tags.splice(i, 1)
                const path = qs.stringify(query, {
                    addQueryPrefix: true,
                    encode: false
                })
                this.props.history.push(path)
            }
        }
    }

    render() {
        const { classes } = this.props

        let theme = textToThemeMap.get(this.props.value)
        if (!theme) {
            theme = createMuiTheme({ palette: { primary: { main: getColor({ text: this.props.value }) } } })
            textToThemeMap.set(this.props.value, theme)
        }

        return (<ThemeProvider theme={theme}>
            <Chip
                color="primary"
                onClick={!this.hasTagsQuery() ? this.addTagsQuery : null}
                onDelete={this.hasTagsQuery() ? this.removeTagsQuery : null}
                label={this.props.value}
                size="small"
                className={classes.chip}
            />
        </ThemeProvider>)
    }
};

export default withStyles(useStyles)(withRouter(TagChip))