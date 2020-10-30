const express = require('express');
const cors = require('cors');
const postsRouter = require('./routers/posts.js');

const server = express();
server.use(express.json());
server.use(cors());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.status(200).json({message:"api online"})
})

module.exports = server;