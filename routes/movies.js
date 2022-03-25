const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { 
    createMovie, 
} = require('../controllers/movies');

const router = Router();

// Crear película/serie
router.post('/', [
    validateJWT,
    check('title', 'El título de la película/serie es obligatorio').not().isEmpty(),
    validateFields
], createMovie);

module.exports = router;
