const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db'
});

connection.connect();

module.exports = {
    createUser: function(newUser, callback) {
        connection.query('INSERT INTO users SET ?', newUser, callback);
    },

    getUserById: function(userId, callback) {
        connection.query('SELECT * FROM users WHERE id = ?', userId, callback);
    },

    updateUser: function(userId, updatedUser, callback) {
        connection.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], callback);
    },

    deleteUser: function(userId, callback) {
        connection.query('DELETE FROM users WHERE id = ?', userId, callback);
    }
};
