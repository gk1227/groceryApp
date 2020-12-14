var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
        new Product({
        imagePath: 'https://www.tesla.com/sites/default/files/modelsx-new/sx-specs/MS-specs-desktop.jpg',
        title: 'Tesla ModelS',
        description: 'Model S is an awesome car',
        price: 79000,
    }),
    new Product({
        imagePath: 'https://www.ibm.com/quantum-computing/_nuxt/img/7156eb7.png',
        title: 'Quantam computer',
        description: 'Powerful super computer',
        price: 10000000,
    })

];//closing of array

var done = 0;

for (var i = 0; i < products.length; i++ ){
    products[i].save(function (err, result){
    done++;
    if (done == products.length)
    {
        exit();
    }
    });
}

function exit() {
    mongoose.disconnect();
}

