import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import PostForm from './PostForm'
import qs from 'qs'
import { withRouter } from 'react-router'
import clean from './clean'

const useStyles = (theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
        width: 250
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        alignIItems: 'baseline'
    },
    grow: {
        flexGrow: 1,
    },
    fullList: {
        width: 'auto',
    },
    searchField: {
        padding: '4px 4px',
        [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
            padding: '2px 2px',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '8px 8px',
        },
        display: 'flex',
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
})


class Navbar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            searchText: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).search || ''
        }

        this.handleSearchText = this.handleSearchText.bind(this)
        this.handleSearchTextSubmit = this.handleSearchTextSubmit.bind(this)
        this.setSearchQuery = this.setSearchQuery.bind(this)
    }

    handleSearchText(e) {
        this.setSearchQuery(e.target.value)
        this.setState({ searchText: e.target.value })
    }

    handleSearchTextSubmit(e) {
        this.setSearchQuery(this.state.searchText)
        this.setState({ searchText: '' })
        e.preventDefault()
    }

    setSearchQuery(searchText) {
        const path = qs.stringify(clean({
            ...qs.parse(this.props.location.search, { ignoreQueryPrefix: true }),
            search: (searchText?.length) ? searchText : null
        }), {
            addQueryPrefix: true,
            encode: false
        })

        if (this.state.searchText === searchText)
            this.props.history.push(path)
        else
            this.props.history.replace(path)
    }

    render() {
        const { classes } = this.props
        return (
            <>
                <CssBaseline />
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" className={classes.menuButton} onClick={() => this.setState({ open: true })}>
                            <MenuIcon />
                        </IconButton>

                        <PostForm searchText={this.state.searchText} name={this.props.name} photo={this.props.photo} onNewPost={this.props.onNewPost} />

                        <Paper component="form" className={classes.searchField} onSubmit={this.handleSearchTextSubmit}>
                            <InputBase
                                className={classes.input}
                                placeholder="Search"
                                onChange={this.handleSearchText}
                                value={this.state.searchText}
                            />
                            <IconButton type="submit" size="small" className={classes.iconButton}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Toolbar>
                </AppBar>
                <div
                    onClick={() => this.setState({ open: false })}
                    onKeyDown={() => this.setState({ open: false })}
                >
                    <Drawer anchor={'bottom'} open={this.state.open}>
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt={this.props.name} src={this.props.photo} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.props.name}
                                />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button component="a" href="/auth/logout">
                                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
            </>
        )
    }
}

export default withStyles(useStyles)(withRouter(Navbar))