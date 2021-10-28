const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/all-categories', async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/id/:id', async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });

        if (!categoryData) {
            res.status(404).json({ message: 'No categories found!' });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/new-category', async(req, res) => {
    // create a new category
    try {
        const categoryData = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/update/:id', (req, res) => {
    // update a category by its `id` value
    Category.update({

            category_name: req.body.category_name,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((categoryData) => {
            res.json(categoryData);
        })
        .catch((err) => res.json(err));
});

router.delete('/delete/:id', (req, res) => {
    Category.destroy({
            where: {
                id: req.params.id
            },
        })
        .then((deletedCategory) => {
            res.json(deletedCategory);
        })
        .catch((err) => res.json(err));
    // delete a category by its `id` value
});

module.exports = router;