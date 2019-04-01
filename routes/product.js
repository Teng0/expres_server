let express = require("express");

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
        price:10
    }
    //res.send("params = "+req.params.id);
    res.render('product',product)
  });

productRouter.get("/",function(req,res){
    res.send(req.query);
    res.send("product PAGE");
  });

  

  module.exports=productRouter;
