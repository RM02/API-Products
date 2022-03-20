
require('dotenv').config({
    path: './variables.env'
})

const env = process.env.NODE_ENV;

const DEV = {
    server: {
        port: Number(process.env.PORT)
    },
    db: {
        mongo_uri: process.env.MONGO_DEV_URI
    }
}

const TEST = {
    server: {
        port: Number(process.env.PORT)
    },
    db: {
        mongo_uri: process.env.MONGO_DEV_URI
    }
}

const config = {
    DEV,
    TEST
};

module.exports = config[env];