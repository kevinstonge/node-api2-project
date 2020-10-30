const express = require('express');
const router = express.Router();
router.use(express.json());
const Posts = require('../data/db.js');

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (title && contents && title.length > 0 && contents.length > 0) {
        Posts.insert(req.body).then(post => {
            res.status(201).json(post);
        }).catch(e => {
            res.status(500).json({ error: "There was an error while saving the post fot he database" })
        });
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post" });
    }
});

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    Posts.findById(id).then(post => {
        if (post[0].id) {
            const { text } = req.body;
            if (text && text.length > 0) {
                Posts.insertComment(req.body).then(comment => {
                    res.status(201).json(comment)
                }).catch(e => {
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                });
            }
            else {
                res.status(400).json({ errorMessage: "Please provide text for the comment" })
            }
        }
        else {
            res.status(404).json({error: "The post with the specified ID does not exist"})
        }
    }).catch(e => {
        res.status(500).json({ errorMessage: "The post information could not be retrieved" });
    })
})

router.get('/', (req, res) => {
    Posts
        .find(req.query)
        .then(posts => res.status(200).json(posts))
        .catch(e => res.status(404).send({ error: "The posts information could not be retrieved" }))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id).then(post => {
        if (post[0].id) {
            res.status(200).json(post)
        }
        else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    }).catch(e => {
        res.status(500).json({ message: "The post information could not be retrieved" });
    })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    console.log(id);
    Posts.findById(id)
        .then(post => {
            if (post[0].id) {
                Posts.findPostComments(id)
                    .then(comments => {
                        res.status(200).json(comments);
                    })
                    .catch(e => res.status(500).json({ error: "The comments information could not be retrieved" }));
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }
        }).catch(e=>res.status(500).json({error:"The post information could not be retrieved"}))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            if (post[0].id) {
                Posts.remove(id)
                    .then(deleted => {
                        res.status(200).json(deleted);
                    })
                    .catch(e=>res.status(500).json({error:"The post could not be removed"}))
            }
        })
        .catch(e=>res.status(500).json({error:"The post information could not be retrieved"}))
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
        .then(post => {
            if (post[0].id) {
                const { title, contents } = req.body;
                if (title && contents && title.length > 0 && contents.length > 0) {
                    Posts.update(id, req.body)
                        .then(updated => res.status(200).json(updated))
                        .catch(e=>res.status(500).json({error:"The post information could not be modified"}))
                }
                else {
                    res.status(400).json({error:"Please provided title and contents for the post"})
                }
            }
            else {
                res.status(404).json({error:"The post with the specified ID does not exist"})
            }
        })
        .catch(e=>res.status(500).json({error:"The post information could not be retrieved"}))
})

module.exports = router;