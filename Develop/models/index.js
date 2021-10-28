// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
    /// add foreign key and on delete
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
        //// add foreign key and on delete
        foreignKey: 'category_id',
        // onDelete: 'CASCADE'
    }),

    // Products belongToMany Tags (through ProductTag)
    Product.belongsToMany(Tag, {
        through: ProductTag,
        foreignKey: 'product_id'
            //add foreign key
    });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id'
        //add foreign key
})

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};