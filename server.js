// load the things we need
var express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const productService = require("./service/product");
const mongod = new MongoMemoryServer();


var app = express();
app.use(express.json());
app.use(express.urlencoded()); 
module.exports.connect = async () => {};

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
// index page
app.get("/", async function (req, res) {
  let result;
  let totalPrice =0;
    try {
  

     result = await productService.getAll();
    
     result.forEach(res=> totalPrice= res.price+totalPrice);
   
  } catch (e) {
    console.log("err is " + e);
  }
  res.render("pages/index", {
    products: result,
    totalPrice: totalPrice
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.post('/form', async function(req, res) {
    try{
    var name = req.body.name;
    var price = req.body.price;
    var description = req.body.description;
    await productService.create({name, price, description});
    }catch(e){
        console.log("post error "+e)
    }
    res.redirect("/");
});

app.post('/delete', async function(req, res) {
    try{
    var name = req.query.name;
    await productService.deleteProductByName(name);
    }catch(e){
        console.log("delete error "+e)
    }
    res.redirect("/");
});

const runApp = async function(){
    const uri = await mongod.getUri();

    await mongoose.connect(uri);

    const productComplete = [{
      name: "BMW",
      price: 1200,
        description: "BMW LE"
    },{
        name: "Honda",
        price: 1400,
        description: "Civic"
    },{
        name: "Tesla",
        price: 1600,
        description: "Model-S"
    },{
        name: "Hyundai",
        price: 1800,
        description: "Sonata"
    }]
    await productService.create(productComplete);
  await  app.listen(3000);
}
runApp()
console.log("3000 is listening");
