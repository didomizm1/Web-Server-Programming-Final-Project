const express = require('express');
const model = require('../models/workouts');
const router = express.Router();

router
    // Get all
    .get('/', (req, res) => {
        model.getWorkouts()
            .then(list => {
                const data = { data: list, total: list.length, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    // Search
    .get('/search/:q', (req, res) => {
        const term = req.params.q;
        console.log({ term });
        const list = model.searchWorkouts(term);
        const data = { data: list, total: list.length, isSuccess: true };
        res.send(data)
    })

    // Get by ID
    .get('/:id', (req, res) => {
        const id = +req.params.id;
        const workout = model.getWorkoutByID(id);
        const data = { data: workout, isSuccess: true };
        res.send(data)
    })

    // Add new
    .post('/', (req, res) => {
        const workout = req.body;

        console.log({ workout });
        console.log( req.query );
        console.log( req.params );
        console.log( req.headers );

        model.addWorkout(workout);
        const data = { data: workout, isSuccess: true };
        res.send(data)
    })

    // Update
    .patch('/:id', (req, res) => {
        const workout = req.body;
        model.updateWorkout(workout);
        const data = { data: workout, isSuccess: true };
        res.send(data)
    })

    // Delete
    .delete('/:id', (req, res) => {
        const id = +req.params.id;
        model.deleteWorkout(id);
        const data = { data: id, isSuccess: true };
        res.send(data)
    })

module.exports = router;
