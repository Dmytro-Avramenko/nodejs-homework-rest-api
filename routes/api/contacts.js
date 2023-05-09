const express = require('express');

const ctrl = require('../../controllers/contacts/contacts');

const { validateBody, isValidId, isValidIdFavorite } = require('../../middlewares');

const {schemas}  = require('../../models/contact'); 

const router = express.Router();

router.get('/', ctrl.getAll);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.get('/:contactId', isValidId, ctrl.getById);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', isValidId, isValidIdFavorite(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router