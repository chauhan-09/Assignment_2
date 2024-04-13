const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'blog_db'
});

connection.connect();

module.exports = {
    createPost: function(newPost, callback) {
        connection.query('INSERT INTO posts SET ?', newPost, callback);
    },

    getPostById: function(postId, callback) {
        connection.query('SELECT * FROM posts WHERE id = ?', postId, callback);
    },

    updatePost: function(postId, updatedPost, callback) {
        connection.query('UPDATE posts SET ? WHERE id = ?', [updatedPost, postId], callback);
    },

    deletePost: function(postId, callback) {
        connection.query('DELETE FROM posts WHERE id = ?', postId, callback);
    }
};
