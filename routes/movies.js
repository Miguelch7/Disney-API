const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { movieExistById } = require('../helpers/dbValidators');
const { 
    getAllMovies,
    createMovie,
    updateMovie, 
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

// Editar película/serie
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( movieExistById ),
    validateFields
], updateMovie);

module.exports = router;
