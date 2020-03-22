const express = require('express');
const router = express.Router();
const Product = require('../modals/product');
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        } else {
            res.send(products)
        }
    })
});


router.post('/', (req, res) => {
    let newProduct = new Product({
        name: req.body.name,
        price: parseInt(req.body.price)
    })
    newProduct.save().then((product) => res.send(product))
});


router.put('/:id',bodyParser.json(), (req, res) => {
    Product.findOne({_id: req.params.id},(err,oldProduct)=>{
        if (err) {
            res.send(err)
        }else{
            if (req.body.name) {
                oldProduct.name = req.body.name;
            }
            if (req.body.price) {
                oldProduct.price = req.body.price;
            }
            oldProduct.save().then(product=>res.send(product));
        }
    });
});

router.delete('/:id', (req, res) => {
    Product.findOne({_id: req.params.id},(err,product)=>{
        if (err) {
            res.send(err)
        }else{
            product.remove().then(deletedProduct=>res.send(deletedProduct))
        }
    });
});

module.exports = router;