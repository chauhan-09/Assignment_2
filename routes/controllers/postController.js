const userModel = require('../models/userModel');

module.exports = {
    createUser: function(req, res) {
        const newUser = req.body; // Assuming the request body contains user data
        userModel.createUser(newUser, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.status(201).json({ message: 'User created successfully', user: result });
        });
    },

    getUserById: function(req, res) {
        const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
        userModel.getUserById(userId, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ user });
        });
    },

    updateUser: function(req, res) {
        const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
        const updatedUser = req.body; // Assuming the request body contains updated user data
        userModel.updateUser(userId, updatedUser, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User updated successfully' });
        });
    },

    deleteUser: function(req, res) {
        const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
        userModel.deleteUser(userId, (err, result) => {
            if (err) {
                console.error('Error deleting user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (!result.affectedRows) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        });
    }
};
