const express = require('express');
const router = express.Router();
const { getAllUzers, getUzerById, createUzer, updateUzer, deleteUzer } = require('../../controllers/uzerController');
const { validateUzerRegisterBody, validateBody } = require('../../middleware/validateMiddlewares');
const validateJWT = require('../../middleware/authMiddleware');

router.get('/uzers', validateJWT, getAllUzers);
router.get('/uzers/:id', validateJWT, getUzerById);

router.post('/uzers', validateUzerRegisterBody, createUzer);

router.put('/uzers/:id', validateBody, updateUzer);
router.delete('/uzers/:id', deleteUzer);


module.exports = router;

