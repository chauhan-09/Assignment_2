const postModel = require('../models/postModel');

module.exports = {
    createPost: function(req, res) {
        const newPost = req.body; // Assuming the request body contains post data
        postModel.createPost(newPost, (err, result) => {
            if (err) {
                console.error('Error creating post:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(201).json({ message: 'Post created successfully', post: result });
        });
    },

    getPostById: function(req, res) {
        const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
        postModel.getPostById(postId, (err, post) => {
            if (err) {
                console.error('Error fetching post:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ post });
        });
    },

    updatePost: function(req, res) {
        const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
        const updatedPost = req.body; // Assuming the request body contains updated post data
        postModel.updatePost(postId, updatedPost, (err, result) => {
            if (err) {
                console.error('Error updating post:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post updated successfully' });
        });
    },

    deletePost: function(req, res) {
        const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
        postModel.deletePost(postId, (err, result) => {
            if (err) {
                console.error('Error deleting post:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        });
    }
};
