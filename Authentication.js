const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');
const crypto = require('crypto');

const router = express.Router();

const secretKey = crypto.randomBytes(32).toString('hex');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/task-login', async (req, res) => {
    const { taskname, password } = req.body;

    try {
        const task = await taskModel.getTaskByTaskname(taskname);
        if (!task) {
            return res.status(401).json({ message: 'Invalid taskname or password' });
        }

        const passwordMatch = await bcrypt.compare(password, task.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid taskname or password' });
        }

        const token = jwt.sign({ id: task.id, taskname: task.taskname }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authenticateTask = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        req.task = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

router.get('/protected', authenticateUser, (req, res) => {
    res.json({ message: 'This is a protected route for user', user: req.user });
});

router.get('/task-protected', authenticateTask, (req, res) => {
    res.json({ message: 'This is a protected route for task', task: req.task });
});

module.exports = router;
