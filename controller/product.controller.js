const productModel = require("../model/product.model");
const fs = require("fs");

exports.create = (req, res, next) => {
    try {
        const product = JSON.parse(req.body.product);
        productModel.create({
            ...product,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            user: req.token.email
        });
        res.status(201).json({ message: "Produit créé" });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getAll = (req, res, next) => {
    try {
        res.status(200).json(productModel.getAll());
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.update = (req, res, next) => {

    const product = JSON.parse(req.body.product);

    const dataProduct = productModel.getOne(product.id);

    if (dataProduct.user !== req.token.email) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce produit" });
    } else {
        fs.unlinkSync(`images/${dataProduct.image.split("/images/")[1]}`);
        productModel.update({
            ...product,
            image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            user: dataProduct.user
        });
        res.status(201).json({ message: "Produit créé" });
    }


}