const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { getCharacters, createCharacter } = require('../controllers/characters');

const router = Router();

router.get('/', validateJWT, getCharacters);

router.post('/', [
    validateJWT,
    check('name', 'El nombre del personaje es obligatorio').not().isEmpty(),
    check('age', 'La edad del personaje no es válida').isInt(),
    check('weight', 'El peso del personaje no es válido').isNumeric(),
    check('history', 'La historia del personaje es obligatoria').not().isEmpty(),
    validateFields
], createCharacter);

module.exports = router;
