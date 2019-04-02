let express = require("express");
var session = require('express-session')

let productRouter = express.Router();

//ისეთი ფუნქცია რომელიც შეამოწმებს key მნიშვენოლობას ლინკიდან

var protected = function(key){

    return function(req,res,next){

        console.log(req.query);

        if(req.query.key==key){
            next();
        }else{
            res.redirect("/");
        }
    }

}




//productRouter.get("/:id", protected('123'),(req,res)=>{    // ლინკის ვალიდაციის ამბავი Protected ფუნქციით
productRouter.get("/:id",(req,res)=>{

    let product={
        id:123,
        name:"test",
        price:10,
        images:["image1","image2"]
    }
//cookies ს შექმნა
    res.cookie('name', 'tobi');
    //res.send("params = "+req.params.id);
   // res.render('product',product) ეს pug ის სამუშაოთ
    res.render('product.html',product)
  });

productRouter.get("/",function(req,res){
    res.send(req.query);
    res.send("product PAGE");
  });

  

  module.exports=productRouter;
