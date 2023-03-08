const productList = require('../data/product.json');
const fs = require('fs');

/**
 * Create a product and save it in json file
 * @param {*} product the product to create
 * @returns {*} product the created product
 */
exports.create = (product) => {
    productList.push(product);
    fs.writeFileSync('data/product.json', JSON.stringify(productList, null, 4));
    return product;
}

/**
 * Get all products
 * @returns {*} productList the list of products
 */
exports.getAll = () => {
    return productList;
}

exports.getOne = (id) => {
    return productList.find((p) => p.id === id);
}

exports.update = (product) => {
    const index = productList.findIndex((p) => p.id === product.id);
    productList[index] = product;
    fs.writeFileSync('data/product.json', JSON.stringify(productList, null, 4));
}

