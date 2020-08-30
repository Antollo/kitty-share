import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles'
import React from 'react'

const facebookTheme = createMuiTheme({ palette: { primary: { main: '#4267B2' } } })
const googleTheme = createMuiTheme({ palette: { primary: { main: '#DB4437' } } })
const githubTheme = createMuiTheme({ palette: { primary: { main: '#f5f5f5' } } })

const useStyles = (theme) => ({
    first: {
        margin: theme.spacing(0, 0, 1)
    },
    second: {
        margin: theme.spacing(0, 0, 1)
    },
    third: {
        margin: theme.spacing(0, 0, 1)
    },
})

class LoginButtons extends React.Component {

    render() {
        const { classes } = this.props
        return (
            <>
                <ThemeProvider theme={facebookTheme}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.first}
                        startIcon={<Icon className="fab fa-facebook" />}
                        href="/auth/facebook"
                    >
                        Facebook
                        </Button>
                </ThemeProvider>
                <ThemeProvider theme={googleTheme}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.first}
                        startIcon={<Icon className="fab fa-google" />}
                        href="/auth/google"
                    >
                        Google
                        </Button>
                </ThemeProvider>
                <ThemeProvider theme={githubTheme}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.first}
                        startIcon={<Icon className="fab fa-github" />}
                        href="/auth/github"
                    >
                        Github
                        </Button>
                </ThemeProvider>
            </>
        )
    }
}

export default withStyles(useStyles)(LoginButtons)