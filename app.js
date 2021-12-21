const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose= require("mongoose");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

let list=[];

mongoose.connect("mongodb://localhost:27017/notesDB");

const notesSchema= {
  title: String,
  content: String
}

const Note= mongoose.model("Note",notesSchema);

app.get("/",function(req,res){
  Note.find({},function(err,docs){
    if(!err){
      list= docs;
    }
  });
  res.render("notes",{list: list});
});

app.post("/",function(req,res){
  let page= new Note({
    title: req.body.title,
    content: req.body.content
  });
  page.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
