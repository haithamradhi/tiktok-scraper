require('dotenv').config()
const express = require('express')
const {apiGetUserData} = require('./api/getUser')
const {apiGetPostsData} = require('./api/getPosts')



const app = express();

const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
    res.send('Server is up and running!')
})


app.get('/api/user', (req, res) => {
    apiGetUserData(req, res)
})

app.get('/api/posts', (req, res) => {
    apiGetPostsData(req, res)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})