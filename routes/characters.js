const { Router } = require('express');
const { validateJWT } = require('../middlewares/validateJWT');
const { getCharacters } = require('../controllers/characters');

const router = Router();

router.get('/', validateJWT, getCharacters);

module.exports = router;
