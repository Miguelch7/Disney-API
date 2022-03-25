const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validateJWT');
const { validateFields } = require('../middlewares/validateFields');
const { characterExistById } = require('../helpers/dbValidators');
const { getCharacters, createCharacter, updateCharacter, deleteCharacter } = require('../controllers/characters');

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

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( characterExistById ),
    validateFields
], updateCharacter);

router.delete('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isNumeric(),
    check('id').custom( characterExistById ),
    validateFields
], deleteCharacter);

module.exports = router;
