const { Router } = require('express');
const { check } = require('express-validator');
const { register } = require('../controllers/auth');
const { usernameExists, emailExists } = require('../helpers/dbValidators');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('username').custom( usernameExists ),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'La contraseña debe tener mínimo 8 caracteres, un número, una letra mayúscula y una letra minúscula').isStrongPassword({ minSymbols: 0 }),
    validateFields
], register);

module.exports = router;
