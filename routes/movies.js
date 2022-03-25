const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { movieExistById } = require('../helpers/dbValidators');
const { 
    getAllMovies,
    getOneMovie,
    createMovie,
    updateMovie,
    deleteMovie, 
} = require('../controllers/movies');

const router = Router();

// Listado de películas/series
router.get('/', validateJWT, getAllMovies);

// Detalle de película/serie
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isNumeric(),
    validateFields
], getOneMovie);

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

// Eliminar película/serie
router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( movieExistById ),
    validateFields
], deleteMovie);

module.exports = router;
