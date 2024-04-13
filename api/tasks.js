const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Enter your MySQL password here
    database: 'task_db'
});

connection.connect();

module.exports = {
    createTask: function(newTask, callback) {
        connection.query('INSERT INTO tasks SET ?', newTask, callback);
    },

    getTaskById: function(taskId, callback) {
        connection.query('SELECT * FROM tasks WHERE id = ?', taskId, callback);
    },

    updateTask: function(taskId, updatedTask, callback) {
        connection.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, taskId], callback);
    },

    deleteTask: function(taskId, callback) {
        connection.query('DELETE FROM tasks WHERE id = ?', taskId, callback);
    }
};
