const express = require('express');
const router = express.Router();
router.use(express.json());
const Posts = require('../data/db.js');

router.get('/', (req, res) => {
    Posts.find(req.query).then(posts => {
        if (posts) {
            res.status(200).json(posts);
            // res.status(200).send({ posts });
        }
        else {
            res.status(404).send({ message: 'error' })
            // res.status(404).send({message: "no posts found"})
        }
    });
    
});

module.exports = router;