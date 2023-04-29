const express = require('express');
const model = require('../models/users');
const { requireLogin } = require('../middleware/authorization');
const router = express.Router();

router
    .get('/', (req, res, next) => {
        model.getAll(+req.query.page, +req.query.pageSize)
            .then(list => {
                const data = { data: list.items, total: list.total, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    .get('/search/:q', (req, res, next) => {

        model.search(req.params.q, +req.query.page, +req.query.pageSize)
            .then(list => {
                const data = { data: list.items, total: list.total, isSuccess: true };
                res.send(data)
            }).catch(next);
        
    })

    .get('/:id', (req, res, next) => {

        model.getById(req.params.id)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);

    })

    .post('/', (req, res, next) => {

        model.add(req.body)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);

    })

    .patch('/', requireLogin(true), (req, res, next) => {

        model.update(req.body)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);

    })

    .delete('/:id', requireLogin(true), (req, res, next) => {

        model.deleteItem(req.params.id)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    .post('/seed', requireLogin(true), (req, res, next) => {
        model.seed()
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    .post('/login', (req, res, next) => {
        model.login(req.body.email, req.body.password)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

    .post('/oAuthLogin', (req, res, next) => {
        model.oAuthLogin(req.body.provider, req.body.accessToken)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);
    })

module.exports = router;
