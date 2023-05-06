const mongoose = require('mongoose')
require('dotenv').config()

const db = process.env.MongoCloudURI

module.exports = function () {
    return new Promise((resolve, reject) => {
        mongoose.connect(db, { useNewUrlParser: true })
            .then(() => {
                console.log('MongoDB Connected...')
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}
