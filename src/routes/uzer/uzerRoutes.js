const express = require('express');
const router = express.Router();
const { getAllUzers, getUzerById, createUzer, updateUzer, deleteUzer } = require('../../controllers/uzerController');
const { validateBody } = require('../../middleware/validateMiddlewares');
const validateJWT = require('../../middleware/authMiddleware');

router.get('/uzers', validateJWT, getAllUzers);
router.get('/uzers/:id', validateJWT, getUzerById);
// router.get('/uzers', getAllUzers);
// router.get('/uzers/:id', getUzerById);


router.put('/uzers/:id', validateBody, updateUzer);
router.delete('/uzers/:id', deleteUzer);


module.exports = router;

