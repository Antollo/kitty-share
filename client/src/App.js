import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import AppMain from './components/AppMain'
import Login from './components/Login'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#ffa4a2',
            main: '#e57373',
            dark: '#af4448',
            contrastText: '#000',
        },
        secondary: {
            light: '#aab6fe',
            main: '#7986cb',
            dark: '#49599a',
            contrastText: '#000',
        },
    }
})

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <CookiesProvider>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route>
                                    <AppMain />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </CookiesProvider>
                </ThemeProvider>
            </div>
        )
    }
}

export default App
