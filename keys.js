module.exports = {
    mongodb: {
        dbURI: process.env.KITTY_DB_URI
    },
    google: {
        clientID: process.env.KITTY_GOOGLE_ID,
        clientSecret: process.env.KITTY_GOOGLE_SECRET
    },
    facebook: {
        clientID: process.env.KITTY_FACEBOOK_ID,
        clientSecret: process.env.KITTY_FACEBOOK_SECRET
    },
    github: {
        clientID: process.env.KITTY_GITHUB_ID,
        clientSecret: process.env.KITTY_GITHUB_SECRET
    }
}