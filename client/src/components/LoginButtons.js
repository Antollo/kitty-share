import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import React from 'react';

const facebookTheme = createMuiTheme({ palette: { primary: { main: '#4267B2' } } })
const googleTheme = createMuiTheme({ palette: { primary: { main: '#DB4437' } } })
const githubTheme = createMuiTheme({ palette: { primary: { main: '#f5f5f5' } } })

const useStyles = (theme) => ({
    button: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0
    },
    centerButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0
    }
})

class LoginButtons extends React.Component {

    render() {
        return (
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="baseline"
            >
                <ThemeProvider theme={facebookTheme}>
                    <Fab 
                        color="primary"
                        href="/auth/facebook"
                    >
                        <Icon fontSize="d" className="fab fa-facebook" />
                    </Fab >
                </ThemeProvider>
                <ThemeProvider theme={googleTheme}>
                    <Fab
                        color="primary"
                        href="/auth/google"
                    >
                        <Icon fontSize="d" className="fab fa-google" />
                    </Fab>
                </ThemeProvider>
                <ThemeProvider theme={githubTheme}>
                    <Fab
                        color="primary" 
                        href="/auth/github"
                    >
                        <Icon fontSize="d" className="fab fa-github" />
                    </Fab>
                </ThemeProvider>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(LoginButtons)