const express = require('express');
const model = require('../models/users');
const router = express.Router();

router
    // Get all
    .get('/', (req, res) => {
        const list = model.getUsers();
        const data = { data: list, total: list.length, isSuccess: true };
        res.send(data)
    })

    // Search
    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        console.log({ term });
        const list = model.searchUsers(term);
        const data = { data: list, total: list.length, isSuccess: true };
        res.send(data)
    })

    // Get by ID
    .get('/:id', (req, res) => {
        const id = +req.params.id;
        const user = model.getUserByID(id);
        const data = { data: user, isSuccess: true };
        res.send(data)
    })

    // Add new
    .post('/', (req, res) => {
        const user = req.body;

        console.log({ user });
        console.log( req.query );
        console.log( req.params );
        console.log( req.headers );

        model.addUser(user);
        const data = { data: user, isSuccess: true };
        res.send(data)
    })

    // Update
    .patch('/:id', (req, res) => {
        const user = req.body;
        model.updateUser(user);
        const data = { data: user, isSuccess: true };
        res.send(data)
    })

    // Delete
    .delete('/:id', (req, res) => {
        const id = +req.params.id;
        model.deleteUser(id);
        const data = { data: id, isSuccess: true };
        res.send(data)
    })

module.exports = router;
