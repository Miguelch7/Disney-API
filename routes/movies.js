const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { 
    getAllMovies,
    createMovie, 
} = require('../controllers/movies');

const router = Router();

// Listado de películas/series
router.get('/', validateJWT, getAllMovies);

// Crear película/serie
router.post('/', [
    validateJWT,
    check('title', 'El título de la película/serie es obligatorio').not().isEmpty(),
    validateFields
], createMovie);

module.exports = router;
