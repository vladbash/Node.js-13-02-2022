const { Router } = require('express');

const { itemsProvider } = require('../../services');
const { createItemValidation, updateItemValidation, itemParamValidation } = require('./validations');

const itemRouter = Router();

itemRouter.get('/', async (req, res) => {
    const item = await itemsProvider.getItems();
    res.json(item);
});

itemRouter.get('/:id', itemParamValidation, async (req, res) => {
    res.json(await itemsProvider.getItem(req.params.id));
});

itemRouter.post('/', createItemValidation, async (req, res) => {
    const { value, date = new Date().toISOString() } = req.body;
    res.json(await itemsProvider.setItem({ value, date }));
});

itemRouter.put('/:id', itemParamValidation, updateItemValidation, async (req, res) => {
    const item = req.body;
    res.json(await itemsProvider.setItem({ id: req.params.id, ...item }));
});

itemRouter.delete('/:id', itemParamValidation, async (req, res) => {
    await itemsProvider.deleteItem(req.params.id);
    res.status(200).send();
});

module.exports = itemRouter;